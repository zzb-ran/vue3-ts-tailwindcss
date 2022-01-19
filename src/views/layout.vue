<template>
  <div class="layout w-full h-screen flex">
    <!-- 侧边栏 -->
    <div class="navbar w-60 h-screen border-r fixed">
      <div class="logo h-14 px-4 flex items-center border-b">
        <img
          alt="Workflow"
          class="h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        />
      </div>
      <div class="login-info mt-4 h-14">
        <Popover class="relative" v-if="isLogin">
          <PopoverButton
            class="flex items-center justify-around absolute left-4 hover:text-indigo-500"
          >
            <img :src="avatarUrl" alt="" class="w-10 rounded-full" />
            <span class="nick-name ml-4">
              {{ nickName }}
            </span>
          </PopoverButton>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <PopoverPanel class="absolute z-10 right-4 top-1">
              <div class="w-16 p-1.5 bg-indigo-500 rounded text-white text-xs">
                <button @click="logout">退出登录</button>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <Popover class="relative" v-else>
          <PopoverButton
            class="flex items-center justify-around absolute left-4 hover:text-indigo-500"
          >
            <div
              class="w-10 h-10 flex justify-center items-center text-white rounded-full bg-gray-300"
            >
              <UserIcon class="w-6 h-6" />
            </div>
            <router-link to="/login" custom v-slot="{ navigate }">
              <li
                class="flex items-center px-3 hover:text-indigo-500 cursor-pointer"
                @click="navigate"
              >
                <LoginIcon class="w-5 h-5" />
                <span>去登录</span>
              </li>
            </router-link>
          </PopoverButton>
        </Popover>
      </div>
      <ul class="nav-link flex flex-col items-start px-4 text-sm">
        <router-link
          v-for="menu in menuRoutes"
          :key="menu.path"
          :to="menu.path"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
          <li
            @click="navigate"
            :class="[isActive && 'active', isExactActive && 'active']"
          >
            <span>{{ menu.meta?.title }}</span>
          </li>
        </router-link>
      </ul>
    </div>
    <!-- 顶部导航 -->
    <div class="topbar h-14 bg-white absolute left-60 top-0 border-b z-40">
      <TopBar class="h-full" :secondMenuRoutes="secondMenuRoutes" />
    </div>
    <!-- 视图 -->
    <div class="view flex flex-col translate-x-60 overflow-x-hidden">
      <router-view />
    </div>
    <!-- 播放器 -->
    <PlayAudio />
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted, watch, Ref, ref } from 'vue';
import {
  Router,
  RouteLocationNormalizedLoaded,
  useRouter,
  useRoute,
  RouteRecordRaw
} from 'vue-router';
import { Store, useStore } from 'vuex';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { UserIcon, LoginIcon } from '@heroicons/vue/outline';
import { menuRoutes } from '../router';
import TopBar from '../components/TopBar.vue';
import PlayAudio from '../components/PlayAudio.vue';

const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();
const store: Store<any> = useStore();

const nickName: ComputedRef<any> = computed(
  () => store.state.user.current_user_info?.nickname
);
const avatarUrl: ComputedRef<any> = computed(
  () => store.state.user.current_user_info?.avatarUrl
);
const isLogin: ComputedRef<boolean> = computed(() => store.state.user.isLogin);
const secondMenuRoutes: Ref<RouteRecordRaw[]> = ref([]);

const logout = (): void => {
  store.dispatch('user/logout');
  router.push('/login');
};

const getSecondMenuRoutes = () => {
  secondMenuRoutes.value = router.currentRoute.value.matched[1]?.children;
};

watch(
  () => route.path,
  (n, p) => {
    if (n.split('/')[1] !== p.split('/')[1]) {
      getSecondMenuRoutes();
    }
  }
);

onMounted(() => {
  getSecondMenuRoutes();
});
</script>

<style scoped>
.view,
.topbar {
  width: calc(100vw - 241px);
}

.view::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.view {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.nav-link li {
  width: 100%;
  height: 35px;
  margin-top: 8px;
  text-align: left;
  text-indent: 20px;
  line-height: 35px;
  position: relative;
  cursor: pointer;
}

.nav-link li:nth-child(1) {
  margin-top: -5px;
}

.nav-link li.active {
  color: rgb(99 102 241 / 1);
}
.nav-link li.active::after {
  content: '';
  width: 4px;
  height: 30px;
  background-color: rgb(99 102 241 / 1);
  position: absolute;
  left: 0;
  top: 2.5px;
}
</style>
