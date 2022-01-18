<template>
  <NoLogin v-if="!isLogin" />
  <div v-else class="recommend">
    <SongsTable
      :songsList="calcDayRecommendSongsList"
      :tableColumns="recommendTableColumns"
      @handleSong="handleDayRecommendSong"
    />
  </div>
</template>

<script lang="ts" setup>
import { AxiosError, AxiosResponse } from 'axios';
import {
  ComputedRef,
  Ref,
  computed,
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue';
import { useStore } from 'vuex';
import { dayRecommendSongs } from '../../api/home/recommend';
import NoLogin from '../../components/NoLogin.vue';
import SongsTable from '../../components/SongsTable.vue';
import { IRecommendSong } from '../../interface/home';
import { IPlaySong } from '../../interface/play';
import { CalcDayRecommendSong } from '../../utils/home';

const recommendTableColumns = [
  {
    key: 'picUrl',
    name: '图片'
  },
  {
    key: 'name',
    name: '歌曲'
  },
  {
    key: 'artists',
    name: '歌手'
  },
  {
    key: 'duration',
    name: '时长'
  }
];

const store = useStore();
const isLogin: ComputedRef<any> = computed(() => store.state.user.isLogin);
const dayRecommendSongsList: Ref<IRecommendSong[]> = ref([
  ...store.state.recommend.dayRecommendSongsList
]);

const getDayRecommendSongs = () => {
  dayRecommendSongs()
    .then((res: AxiosResponse) => {
      dayRecommendSongsList.value = res.data.data.dailySongs;
    })
    .catch((error: AxiosError) => {
      console.error(error);
    });
};

// 重新计算DayRecommendSongsList
const calcDayRecommendSongsList: ComputedRef<IRecommendSong[]> = computed(
  () => {
    dayRecommendSongsList.value.forEach((dayRecommendSong) => {
      dayRecommendSong.picUrl = dayRecommendSong.al.picUrl;
      dayRecommendSong.artists = CalcDayRecommendSong(dayRecommendSong).artists;
      dayRecommendSong.duration =
        CalcDayRecommendSong(dayRecommendSong).duration;
    });
    return dayRecommendSongsList.value;
  }
);

// 重新计算PlaySongsList
const calcPlaySongsList: ComputedRef<IPlaySong[]> = computed(() => {
  const playSongsList: IPlaySong[] = [];
  dayRecommendSongsList.value.forEach((dayRecommendSong) => {
    playSongsList.push({
      id: dayRecommendSong.al.id,
      name: dayRecommendSong.al.name,
      artists: dayRecommendSong.artists,
      picUrl: dayRecommendSong.picUrl,
      duration: dayRecommendSong.duration
    });
  });
  return playSongsList;
});

const handleDayRecommendSong = (DayRecommendSongIndex: number): void => {
  console.log(dayRecommendSongsList.value[DayRecommendSongIndex]);
  store.dispatch('play/playSongsList', {
    playSongsList: calcPlaySongsList.value,
    currentSongIndex: DayRecommendSongIndex
  });
};

onMounted(() => {
  if (dayRecommendSongsList.value.length === 0 && isLogin.value)
    getDayRecommendSongs();
});

onBeforeUnmount(() => {
  store.dispatch('recommend/dayRecommendSongsList', [
    ...calcDayRecommendSongsList.value
  ]);
});
</script>
