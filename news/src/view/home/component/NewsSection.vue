<script setup>
import { defineProps } from "vue";
const props = defineProps({
  news: Array,
  title: String,
  src:String,
});
// console.log(props.src)
</script>

<template>
  <div class="news-section-container" v-if="props.news && props.news.length">
    <span class="container-title">{{ props.title }}</span>
    <div class="container-image-text">
      <div class="container-image"><a :href="props.news[0].link"><img :src="src" alt="" /></a></div>
      <span v-if="props.news[0]">{{ props.news[0].title }}</span>
    </div>
    <ul>
      <li
        v-for="item in props.news.slice(1)"
        :key="item.id"
        class="news-section-item"
      >
        <a :href="item.link">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.news-section-container {
  width: 45%;
  background-color: inherit;

  .container-title {
    font-size: 1.5em;
    display: block;
  }

  .container-image-text {
    margin-bottom: 4px;

    .container-image {
      width: 100%;
      height: 150px;

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition: all 0.5s ease;
      }

      img:hover {
        transform: scale(1.05);
      }
    }
  }

  ul {
    padding-left: 0;
    list-style-type: disc !important;

    .news-section-item {
      display: flex;
      padding: 10px 0;
      padding-left: 0;

      a {
        color: inherit;
      }

      a:hover {
        text-decoration: solid underline brown 3px;
      }
    }
  }
}
</style>
