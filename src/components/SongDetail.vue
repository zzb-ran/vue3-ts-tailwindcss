<template>
  <div
    class="song-detail h-view-container bg-white absolute left-60 top-14 flex justify-around"
  >
    <div class="header-back w-full h-14 absolute">
      <ChevronDoubleDownIcon
        class="w-10 h-10 text-slate-200 hover:text-indigo-500 cursor-pointer"
        @click="toggleIsSongDetail"
      />
    </div>
    <div class="song-img w-96 h-96 rounded-md overflow-hidden mt-14">
      <img :src="currentPlaySong.picUrl" alt="" />
    </div>
    <div class="song w-96 mt-14">
      <div class="name">{{ currentPlaySong.name }}</div>
      <div class="lyric h-96 overflow-hidden">
        <ul>
          <li
            :class="[
              currentTime === currentPlaySong.lyric?.newLyric[lyricIndex].time
                ? 'active'
                : ''
            ]"
            v-for="(lyric, lyricIndex) in currentPlaySong.lyric?.lyricList"
            :key="lyric"
          >
            {{ lyric }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { ChevronDoubleDownIcon } from '@heroicons/vue/outline';
import { ILyc, IPlaySong } from '../interface/play';

const props = defineProps<{
  currentTime: string;
}>();

const store = useStore();

const currentPlaySong: ComputedRef<IPlaySong> = computed(
  () => store.state.play.currentPlaySong
);

const toggleIsSongDetail = () => {
  store.dispatch('play/toggleIsSongDetail', !store.state.play.isSongDetail);
};

watch(
  () => props.currentTime,
  (n, p) => {
    console.log(p);
    // const currentLyricIndex: number =
    currentPlaySong.value.lyric?.newLyric.forEach((lycItem: ILyc) => {
      if (lycItem.time === p) {
        console.log(lycItem);
      }
    });
    // console.log(currentLyricIndex);
    // console.log(
    //   currentPlaySong.value.lyric?.newLyric[currentLyricIndex],
    //   currentLyricIndex
    // );
  }
);
</script>

<style scoped>
.song-detail {
  width: calc(100vw - 240px);
  height: calc(100% - 56px);
  min-height: 384px;
  z-index: 999;
}

.active {
  color: rgb(99 102 241 / 1);
}
</style>
