<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="slider-view h-max w-full" v-if="true">
      <div class="sliders h-96 w-full flex relative">
        <div
          :class="[
            className[bannerIndex],
            'slider-item absolute rounded-md overflow-hidden shadow-lg transition-all cursor-pointer'
          ]"
          v-for="(banner, bannerIndex) in banners"
          @click="handleBanner(bannerIndex)"
        >
          <img class="w-full h-full" v-lazy="banner.imageUrl" alt="" />
          <span
            class="text-white text-xs rounded-md px-3 py-2 absolute bottom-4 right-4"
            :style="{ backgroundColor: banner.titleColor }"
          >
            {{ banner.typeTitle }}
          </span>
        </div>
      </div>
    </div>
    <!-- 热门推荐歌单 -->
    <div class="recommend-resource-view">
      <p
        class="title h-9 leading-9 pt-2 text-left indent-8 text-xl font-extrabold relative"
      >
        热门推荐歌单
      </p>
      <div class="flex flex-wrap py-2">
        <div
          class="recommend-resource-item group cursor-pointer px-4 py-2 w-1/6 relative"
          :title="recommendResource.name"
          v-for="(
            recommendResource, recommendResourceIndex
          ) in calcRecommendResourceList"
          :key="recommendResource.name"
          @click="handleRecommendResource(recommendResourceIndex)"
        >
          <span
            class="flex items-center text-white text-sm absolute top-4 right-6 z-10"
          >
            <UserGroupIcon class="w-4 h-4" />
            {{ recommendResource.playCount }}
          </span>
          <img
            class="rounded-md"
            v-lazy="recommendResource.picUrl"
            :alt="recommendResource.name"
          />
          <p class="truncate text-sm text-left group-hover:text-indigo-500">
            {{ recommendResource.name }}
          </p>
        </div>
      </div>
    </div>
    <!-- 热门推荐新歌 -->
    <div class="recommend-newsongs-view">
      <p
        class="title h-9 leading-9 pt-2 text-left indent-8 text-xl font-extrabold relative"
      >
        热门推荐新歌
      </p>
      <div class="h-97 flex flex-col flex-wrap py-2">
        <div
          class="recommend-song-item group cursor-pointer px-4 py-2 w-1/4 h-16 flex rounded-md relative"
          :title="recommendSong.name"
          v-for="(recommendSong, recommendSongIndex) in calcRecommendSongsList"
          @click="handleRecommendSong(recommendSongIndex)"
        >
          <PlayIcon
            class="w-10 h-10 absolute left-5 top-3 text-white opacity-0 group-hover:opacity-80"
          />
          <img
            class="w-12 rounded-md"
            v-lazy="recommendSong.picUrl"
            :alt="recommendSong.name"
          />
          <div
            class="song-description px-4 flex flex-col items-start group-hover:text-indigo-500"
          >
            <p class="text-left truncate">{{ recommendSong.name }}</p>
            <span class="text-sm">{{ recommendSong.artists }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ComputedRef,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref
} from 'vue';
import { useStore } from 'vuex';
import { AxiosError, AxiosResponse } from 'axios';
import { UserGroupIcon, PlayIcon } from '@heroicons/vue/outline';
import {
  IBanner,
  IRecommendResource,
  IRecommendSong
} from '../../interface/home';
import { banner, recommendResource, recommendSongs } from '../../api/home';
import {
  CalcDayRecommendSong,
  CalcPlayCount,
  CalcRecommendSong
} from '../../utils/home';
import { IPlaySong } from '../../interface/play';
import { getSongDetail } from '../../api/play';

const store = useStore();
const className: Ref<string[]> = ref([...store.state.index.className]);
const banners: Ref<IBanner[]> = ref([...store.state.index.banners]);
const recommendResourceList: Ref<IRecommendResource[]> = ref([
  ...store.state.index.recommendResourceList
]);
const recommendSongsList: Ref<IRecommendSong[]> = ref([
  ...store.state.index.recommendSongsList
]);

const getBanners = (): void => {
  banner().then((res: AxiosResponse) => {
    banners.value = res.data.banners;
    const hiddenArray = new Array(banners.value.length - 2)
      .join('hidden,')
      .split(',');
    hiddenArray.pop();
    className.value = className.value.concat(hiddenArray);
  });
};

const getRecommendResource = (limit: number = 12) => {
  recommendResource(limit)
    .then((res: AxiosResponse) => {
      recommendResourceList.value = res.data.result;
    })
    .catch((error: AxiosError) => {
      console.error(error);
    });
};

const getRecommendSongs = (limit: number = 12) => {
  recommendSongs(limit)
    .then((res: AxiosResponse) => {
      recommendSongsList.value = res.data.result;
    })
    .catch((error: AxiosError) => {
      console.error(error);
    });
};

const startSlider = (): void => {
  setInterval(() => {
    className.value.unshift(className.value.pop() as string);
  }, 3000);
};

// TODO: 点击轮播图某一张
const handleBanner = (bannerIndex: number): void => {
  getSongDetail(banners.value[bannerIndex].targetId)
    .then((res: AxiosResponse) => {
      if (res.data.songs.length === 0) {
        console.warn('没有详情...');
        return;
      }
      const song = res.data.songs[0];
      store.dispatch('play/insertPlaySong', {
        playSong: {
          id: song.al.id,
          name: song.al.name,
          artists: CalcDayRecommendSong(song).artists,
          picUrl: song.al.picUrl,
          duration: CalcDayRecommendSong(song).duration
        },
        currentSongIndex: store.state.play.currentSongIndex
      });
    })
    .catch((error: AxiosError) => {
      console.error(error);
    });
};

// TODO: 点击某一个推荐歌单
const handleRecommendResource = (recommendResourceIndex: number): void => {
  console.log(recommendResourceList.value[recommendResourceIndex]);
};

// TODO: 点击某一个推荐新歌
const handleRecommendSong = (recommendSongIndex: number): void => {
  console.log(recommendSongsList.value[recommendSongIndex]);
  store.dispatch('play/playSongsList', {
    playSongsList: calcPlaySongsList.value,
    currentSongIndex: recommendSongIndex
  });
};

// 重新计算RecommendResourceList
const calcRecommendResourceList: ComputedRef<IRecommendResource[]> = computed(
  () => {
    recommendResourceList.value.forEach((recommendResource) => {
      recommendResource.playCount = CalcPlayCount(recommendResource.playCount);
    });
    return recommendResourceList.value;
  }
);

// 重新计算RecommendSongsList
const calcRecommendSongsList: ComputedRef<IRecommendSong[]> = computed(() => {
  recommendSongsList.value.forEach((recommendSong) => {
    recommendSong.artists = CalcRecommendSong(recommendSong).artists;
    recommendSong.duration = CalcRecommendSong(recommendSong).duration;
  });
  return recommendSongsList.value;
});

// 重新计算PlaySongsList
const calcPlaySongsList: ComputedRef<IPlaySong[]> = computed(() => {
  const playSongsList: IPlaySong[] = [];
  recommendSongsList.value.forEach((recommendSong) => {
    playSongsList.push({
      id: recommendSong.id,
      name: recommendSong.song.name,
      artists: recommendSong.artists,
      picUrl: recommendSong.picUrl,
      duration: recommendSong.duration
    });
  });
  return playSongsList;
});

onMounted(() => {
  if (banners.value.length === 0) getBanners();
  startSlider();
  if (recommendResourceList.value.length === 0) getRecommendResource();
  if (recommendSongsList.value.length === 0) getRecommendSongs();
});

onBeforeUnmount(() => {
  store.dispatch('index/banner', [...banners.value]);
  store.dispatch('index/updateClassName', [...className.value]);
  store.dispatch('index/recommendResourceList', [
    ...calcRecommendResourceList.value
  ]);
  store.dispatch('index/recommendSongsList', [...calcRecommendSongsList.value]);
});
</script>

<style scoped>
.title::before {
  content: '';
  width: 4px;
  height: calc(100% - 8px);
  background-color: rgb(99 102 241 / 1);
  position: absolute;
  left: 16px;
  top: 12px;
}
</style>
