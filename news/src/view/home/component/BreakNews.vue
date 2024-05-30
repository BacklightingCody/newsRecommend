<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { getBreakNews } from "@/api/getNews";
const props = defineProps({
  category: {
    required: true,
    type: String,
  },
});
const newsList = ref([]);
const getNewsList = async () => {
  const res = await getBreakNews();
  newsList.value = res.data.slice(1, 15);
  // console.log(res);
};
onMounted(() => {
  getNewsList();
});
</script>

<template>
  <!-- 即时新闻 -->
  <div class="breaknews-container">
    <a href="#" class="news-container-title">#即时新闻精选</a>
    <ul class="trending-news">
      <li
        v-for="item in newsList"
        :key="item.id"
        class="trending-news-item"
        :title="item.title"
      >
        <RouterLink
          :to="{
            name: 'articleDetail',
            params: { id: item.id, category: props.category },
          }"
          >{{ item.title }}</RouterLink
        >
      </li>
    </ul>
  </div>
  <!-- 热门图片 -->
</template>

<style lang="scss" scoped>
.breaknews-container {
  width: 100%;

  .news-container-title {
    display: block;
    color: $color-text;
    font: $text-title;
    padding: 10px;
    font-size: 1.5em;
  }

  .trending-news {
    .trending-news-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 15px 0;
      a {
        color: inherit;
      }
    }

    .trending-news-item:hover {
      background-color: $color-accent;
      cursor: pointer;
    }
  }
}
</style>