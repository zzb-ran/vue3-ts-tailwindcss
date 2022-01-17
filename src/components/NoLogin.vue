<template>
  <div class="h-full flex flex-col items-center list-none">
    <EmojiSadIcon class="w-72 h-72 text-indigo-500" />
    <p class="text-2xl text-indigo-500">你还未登录，此页面需要登录</p>
    <router-link to="/login" custom v-slot="{ navigate }">
      <li
        class="flex items-center mt-6 py-2 px-3 rounded hover:text-indigo-500 active:outline cursor-pointer"
        @click="navigate"
      >
        <LoginIcon class="w-5 h-5" />
        <span>去登录</span>
      </li>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { EmojiSadIcon, LoginIcon } from '@heroicons/vue/outline';
</script>
