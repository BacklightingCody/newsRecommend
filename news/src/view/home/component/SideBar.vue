<script setup>
import { getSidebarNews } from "@/api/getNews";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
// 引入数据
const sidebarList = ref([]);
const getNewsList = async () => {
  const res = await getSidebarNews();
  sidebarList.value = res.data.slice(-12);
};
onMounted(() => {
  getNewsList();
});
const props = defineProps({
  category: {
    required: true,
    type: String,
  },
});
</script>

<template>
  <aside id="sidebar">
    <ul class="sidebar-container" v-if="sidebarList">
      <li
        v-for="news in sidebarList"
        :key="news.id"
        class="sidebar-container-item"
      >
        <RouterLink
          :to="{
            name: 'articleDetail',
            params: { id: news.id, category: props.category },
          }"
          >{{ news.title }}</RouterLink
        >
      </li>
    </ul>
  </aside>
</template>


<style lang="scss" scoped>

#sidebar {
  width: 100%;
  .sidebar-container {
    .sidebar-container-item {
      list-style-type: none;
      padding: 10px;
      a {
        color: inherit;
      }
    }
    .sidebar-container-item:hover {
      background-color: $color-accent;
      cursor: pointer;
    }
  }
}
</style>