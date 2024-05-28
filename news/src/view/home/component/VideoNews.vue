<template>
  <div class="container">
    <div
      class="video-container"
      v-for="(item, index) in videoNewsDate"
      :key="index"
    >
      <div class="video-container-img iconfont icon-bofang">
        <img :src="props.videoList[index]" alt="" />
      </div>
      <RouterLink class="video-title" to="/article">
        {{ item.title }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import videoNewsDate from "@/assets/data/videoNews.json";

const props = defineProps({
  videoList: {
    type: Array,
  },
});

console.log(props.videoList);
</script>

<style lang="scss" scoped>

.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .video-container {
    width: 30%;
    margin-right: 20px;
    .video-container-img {
      position: relative;
      width: 100%;
      height: 200px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .video-container-img::after {
      content: "";
      display: none;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
      cursor: pointer;
    }

    .icon-bofang::before {
      font-size: 40px;
      color: #fff;
      position: absolute;
      left: 10px;
      bottom: 10px;
      opacity: 0.5;
      transition: opacity 0.5s ease;
      z-index: 2;
      cursor: pointer;
    }
  }

  .video-container:hover .video-container-img::after,
  .video-container:hover .icon-bofang::before {
    display: block;
    opacity: 1;
  }

  .video-title {
    display: block;
    margin: 15px 0;
    white-space: wrap;
    cursor: pointer;
    color: $color-text;
  }
}
</style>
