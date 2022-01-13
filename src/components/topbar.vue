<template>
  <ul class="top-nav-link h-full flex items-center justify-start text-xs">
    <router-link
      v-for="menu in props.secondMenuRoutes"
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
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';
const props = defineProps<{
  secondMenuRoutes: RouteRecordRaw[];
}>();
</script>

<style scoped>
.top-nav-link li {
  width: auto;
  height: 35px;
  margin-left: 8px;
  padding: 0 10px;
  text-align: center;
  line-height: 35px;
  position: relative;
  cursor: pointer;
}
.top-nav-link li.active {
  color: rgb(99 102 241 / 1);
}
.top-nav-link li.active:after {
  content: '';
  width: 100%;
  height: 2px;
  background-color: rgb(99 102 241 / 1);
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
