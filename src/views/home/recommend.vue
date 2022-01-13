<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <div class="slider-view h-max w-full">
      <div class="sliders h-96 w-full flex relative">
        <div
          :class="[
            className[bannerIndex],
            'slider-item absolute rounded-md overflow-hidden shadow-2xl transition-all cursor-pointer'
          ]"
          v-for="(banner, bannerIndex) in banners"
          @click="handleBanner(bannerIndex)"
        >
          <img class="w-full h-full" :src="banner.imageUrl" alt="" />
          <span
            class="text-white text-xs rounded-md px-3 py-2 absolute bottom-4 right-4"
            :style="{ backgroundColor: banner.titleColor }"
          >
            {{ banner.typeTitle }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue';
import { useStore } from 'vuex';
import { AxiosResponse } from 'axios';
import { IBanner } from '../../interface/home/ihome';

const store = useStore();
const className: Ref<string[]> = ref([...store.state.home.className]);
const banners: Ref<IBanner[]> = ref(store.state.home.banners);

const getBanners = (): void => {
  store.dispatch('home/banner').then((res: AxiosResponse) => {
    banners.value = res.data.banners;
    const hiddenArray = new Array(banners.value.length - 2)
      .join('hidden,')
      .split(',');
    hiddenArray.pop();
    className.value = className.value.concat(hiddenArray);
  });
};

const startSlider = (): void => {
  setInterval(() => {
    className.value.unshift(className.value.pop() as string);
  }, 3000);
};

// TODO: 点击轮播图某一张
const handleBanner = (bannerIndex: number): void => {
  console.log(banners.value[bannerIndex]);
};

onMounted(() => {
  if (banners.value.length === 0) getBanners();
  startSlider();
});

onBeforeUnmount(() => {
  store.dispatch('home/updateClassName', [...className.value]);
});
</script>
