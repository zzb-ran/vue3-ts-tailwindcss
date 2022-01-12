<template>
  <div class="layout w-full h-screen flex">
    <div class="navbar w-60 border-r">
      <div class="logo h-14 px-4 flex items-center">
        <img
          alt="Workflow"
          class="h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        />
      </div>
      <div class="login-info mt-4">
        <Popover class="relative h-14">
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
    <div class="view w-full">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { menuRoutes } from '../router';

const router = useRouter();
const store = useStore();

const nickName = computed(() => store.state.user.current_user_info?.nickname);
const avatarUrl = computed(() => store.state.user.current_user_info?.avatarUrl);

const logout = () => {
  store.dispatch('user/logout');
  router.push('/login');
};

onMounted(() => {
  if (store.state.user.cookie === undefined) router.push('/login');
});
</script>

<style scoped>
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
.nav-link li.active:after {
  content: '';
  width: 4px;
  height: 30px;
  background-color: rgb(99 102 241 / 1);
  position: absolute;
  left: 0;
  top: 2.5px;
}
</style>
