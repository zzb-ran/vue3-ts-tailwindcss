<template>
  <table class="w-4/5 mx-auto text-left">
    <thead>
      <tr>
        <td
          class="text-lg font-bold text-indigo-500"
          v-for="tableColumn in props.tableColumns"
          :key="tableColumn.key"
        >
          {{ tableColumn.name }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="h-14 cursor-pointer hover:text-indigo-500 hover:bg-slate-100"
        v-for="(song, songIndex) in props.songsList"
        :key="song.al.id"
        @click="emits('handleSong', songIndex)"
      >
        <td><img class="w-12 rounded-md" :src="song.picUrl" alt="" /></td>
        <td v-for="i in tableColumns.length - 1" :key="tableColumns[i].key">
          {{ song[tableColumns[i].key] }}
          <!-- 不知道怎么写 -->
          <!-- <component :is="tableColumn.key === 'picUrl' ? 'img' : 'span'">
            {{ song[tableColumn.key] }}
          </component> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { IRecommendSong } from '../interface/home';

interface TableColumn {
  key: string;
  name: string;
}

const props = defineProps<{
  tableColumns: TableColumn[];
  songsList: IRecommendSong[];
}>();

const emits = defineEmits<{
  (e: 'handleSong', songIndex: number): void;
}>();
</script>
