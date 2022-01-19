<template>
  <div class="audio-view">
    <div
      class="play-audio-view h-14 bg-white absolute left-60 bottom-0 border-t z-40 flex justify-around"
      v-if="isPlayView"
    >
      <audio
        ref="myAudio"
        :src="currentPlaySong.url"
        autoplay
        preload="metadata"
        :loop="isLoop"
        @canplay="canplay"
        @timeupdate="timeupdate"
        @ended="ended"
      ></audio>
      <div class="audio-percent" @click="toSongTime"></div>
      <div
        class="song-description h-full flex items-center px-2 absolute left-0"
      >
        <ChevronDoubleUpIcon
          class="w-10 h-10 absolute left-3 top-2.5 text-white opacity-0 hover:opacity-80 cursor-pointer"
        />
        <img class="w-12 h-12 rounded-md" :src="currentPlaySong.picUrl" />
        <div
          class="song-description px-4 flex flex-col items-start group-hover:text-indigo-500"
        >
          <p class="text-left truncate">{{ currentPlaySong.name }}</p>
          <span class="text-sm">{{ currentPlaySong.artists }}</span>
        </div>
      </div>
      <div class="play-controller flex items-center">
        <RewindIcon
          class="w-10 h-10 text-slate-300 hover:text-indigo-500"
          @click="prevSong"
        />
        <div class="w-12 h-12">
          <PlayIcon
            class="w-full h-full text-slate-300 hover:text-indigo-500"
            v-if="!isPlay"
            @click="toggleIsPlay(true)"
          />
          <PauseIcon
            class="w-full h-full text-slate-300 hover:text-indigo-500"
            v-else
            @click="toggleIsPlay(false)"
          />
        </div>
        <FastForwardIcon
          class="w-10 h-10 text-slate-300 hover:text-indigo-500"
          @click="nextSong"
        />
      </div>
      <div class="play-list-menu h-full flex items-center absolute right-4">
        <div class="duration mt-1">
          <span class="current-time"> {{ currentTime }} </span>
          /
          <span class="song-time"> {{ currentPlaySong.duration }} </span>
        </div>
        <div class="play-state pl-2 hover:text-indigo-500 cursor-pointer">
          <component
            class="w-5 h-5"
            :is="playStateList[playStateIndex].icon"
            @click="togglePlayState"
          ></component>
        </div>
        <Popover class="h-full flex items-center pl-2">
          <PopoverButton>
            <MenuAlt2Icon class="w-5 h-5 hover:text-indigo-500" />
          </PopoverButton>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-2 opacity-0"
            enter-to-class="-translate-y-2 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="-translate-y-2 opacity-100"
            leave-to-class="translate-y-2 opacity-0"
          >
            <PopoverPanel :unmount="false">
              <div
                class="menu w-80 h-94 absolute right-4 bottom-14 bg-gray-100 rounded-md overflow-y-auto"
                ref="Menu"
              >
                <ul :class="['', 'px-3 py-2']">
                  <li
                    :class="[
                      playSongIndex === currentSongIndex ? 'active' : '',
                      'w-full h-10 flex items-center rounded cursor-pointer hover:bg-indigo-500 hover:text-gray-100'
                    ]"
                    v-for="(playSong, playSongIndex) in playSongsList"
                    :key="playSong.id"
                    @click="toggleSong(playSongIndex)"
                  >
                    <MusicNoteIcon
                      class="w-4 h-4 text-gray-100"
                      v-if="playSongIndex === currentSongIndex"
                    />
                    <div
                      class="name w-60 h-full leading-10 pl-2 text-left text-xs truncate"
                    >
                      {{ playSong.name }} - {{ playSong.artists }}
                    </div>
                  </li>
                </ul>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
    </div>
    <!-- 没有歌曲播放 -->
    <div
      class="pause-audio-view h-14 bg-white absolute left-60 bottom-0 border-t z-40 flex items-center justify-center"
      v-else
    >
      <span class="text-indigo-500">还没有歌曲播放</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted, watch, Ref, ref } from 'vue';
import { Store, useStore } from 'vuex';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import {
  ChevronDoubleUpIcon,
  PlayIcon,
  PauseIcon,
  RewindIcon,
  FastForwardIcon,
  MenuAlt2Icon,
  MusicNoteIcon,
  MenuAlt4Icon,
  ReplyIcon,
  VariableIcon
} from '@heroicons/vue/outline';
import { IPlaySong } from '../interface/play';
import { CalcDuration } from '../utils/common';

const playStateList = [
  { name: 'sequence', icon: MenuAlt4Icon },
  { name: 'loop', icon: ReplyIcon },
  { name: 'random', icon: VariableIcon }
];

const store: Store<any> = useStore();

const playSongsList: ComputedRef<IPlaySong[]> = computed(() => [
  ...store.state.play.playSongsList
]);
const currentPlaySong: ComputedRef<IPlaySong> = computed(
  () => store.state.play.currentPlaySong
);
const currentSongIndex: ComputedRef<number> = computed(
  () => store.state.play.currentSongIndex
);
const isPlayView: ComputedRef<boolean> = computed(() =>
  store.state.play.playSongsList.length === 0 ? false : true
);
const isPlay: ComputedRef<boolean> = computed(() => store.state.play.isPlay);
const playState: ComputedRef<string> = computed(
  () => store.state.play.playState
);
const myAudio: Ref<HTMLAudioElement | null> = ref(null);
const Menu: Ref<HTMLDivElement | null> = ref(null);
const isLoop: Ref<boolean> = ref(false);
const currentTime: Ref<string> = ref('00:00');
const currentPercent: Ref<string> = ref('0%');
const bufferPercent: Ref<string> = ref('0%');
const playStateIndex: Ref<number> = ref(0);

const canplay = (e: any) => {
  // console.log('canplay', e);
};

const timeupdate = () => {
  if (myAudio.value?.readyState === 4) {
    let timeRanges = myAudio.value?.buffered;
    let buffered = timeRanges.end(timeRanges.length - 1);
    currentTime.value = CalcDuration(myAudio.value?.currentTime);
    bufferPercent.value = (buffered * 100) / myAudio.value?.duration + '%';
    currentPercent.value =
      (myAudio.value?.currentTime * 100) / myAudio.value?.duration + '%';
  }
};

const ended = () => {
  console.log('这首播放结束');
  if (playState.value === 'sequence') {
    nextSong();
  } else if (playState.value === 'loop') {
    store.dispatch('play/updateCurrentSongIndex', currentSongIndex.value);
    store.dispatch('play/toggleIsPlay', true);
  } else {
    const randomIndex = Math.floor(
      Math.random() * playSongsList.value.length + 1
    );
    store.dispatch('play/updateCurrentSongIndex', randomIndex);
    store.dispatch('play/toggleIsPlay', true);
  }
};

const toSongTime = (e: any) => {
  const toTimePercent = e.offsetX / e.target.clientWidth;
  (myAudio.value as HTMLAudioElement).currentTime =
    (myAudio.value as HTMLAudioElement).duration * toTimePercent;
};

const prevSong = () => {
  store.dispatch(
    'play/updateCurrentSongIndex',
    currentSongIndex.value - 1 < 0
      ? playSongsList.value.length - 1
      : currentSongIndex.value - 1
  );
  store.dispatch('play/toggleIsPlay', true);
};

const nextSong = () => {
  store.dispatch(
    'play/updateCurrentSongIndex',
    currentSongIndex.value + 1 > playSongsList.value.length - 1
      ? 0
      : currentSongIndex.value + 1
  );
  store.dispatch('play/toggleIsPlay', true);
};

const toggleIsPlay = (bool: boolean) => {
  if (bool && myAudio.value?.paused) {
    myAudio.value?.play();
  } else {
    myAudio.value?.pause();
  }
  store.dispatch('play/toggleIsPlay', bool);
};

const toggleSong = (playSongIndex: number) => {
  store.dispatch('play/updateCurrentSongIndex', playSongIndex);
  store.dispatch('play/toggleIsPlay', true);
};

const togglePlayState = () => {
  playStateIndex.value++;
  playStateIndex.value =
    (playStateIndex.value + playStateList.length) % playStateList.length;
  if (playStateIndex.value === 1) {
    isLoop.value = true;
  } else {
    isLoop.value = false;
  }
  store.dispatch(
    'play/togglePlayState',
    playStateList[playStateIndex.value].name
  );
};

const getScrollY = (currentSongIndex: number) => {
  return currentSongIndex > 4
    ? currentSongIndex > playSongsList.value.length - 5
      ? (playSongsList.value.length - 9) * 40
      : (currentSongIndex - 4) * 40
    : 0;
};

watch(
  () => currentSongIndex.value,
  (n, p) => {
    Menu.value?.scrollTo(0, getScrollY(n));
  }
);

onMounted(() => {
  Menu.value?.scrollTo(0, getScrollY(currentSongIndex.value));
});
</script>

<style scoped>
.play-audio-view,
.pause-audio-view {
  width: calc(100vw - 241px);
}

.menu::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.menu {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.audio-percent {
  width: 100%;
  height: 2px;
  background-color: transparent;
  position: absolute;
  left: 0;
  top: -1.5px;
  cursor: pointer;
  z-index: 99;
}

.play-audio-view::after {
  content: '';
  width: v-bind(currentPercent);
  height: 2px;
  background-color: rgb(99 102 241 / 1);
  position: absolute;
  left: 0;
  top: -1.5px;
}

.play-audio-view::before {
  content: '';
  width: v-bind(bufferPercent);
  height: 2px;
  background-color: rgb(229 231 235 / 1);
  position: absolute;
  left: 0;
  top: -1.5px;
}

.menu li.active {
  color: white;
  background-color: rgb(99 102 241 / 1);
}
</style>
