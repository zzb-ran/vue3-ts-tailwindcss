<template>
  <div class="topbar h-14">
    <TopBar :secondMenuRoutes="homeMenuRoutes" />
  </div>
  <div class="view-container pt-2 px-4">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import TopBar from '../../components/topbar.vue';
import { homeMenuRoutes } from '../../router/index';
</script>
