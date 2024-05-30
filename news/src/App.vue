<script setup>
import { RouterView, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";

const route = useRoute();
const key = ref(route.fullPath);

watch(route, () => {
  key.value = route.fullPath; // 当路由变化时，更新 key，强制重新渲染组件
});
// const showHomePage = computed(() => route.path !== "/login");




</script>

<template>
  <div id="all-container">
    <!-- <HomePage v-if="showHomePage" /> -->
    <router-view :key="key"></router-view>

  </div>
</template>

<style lang="scss">


#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
  font-family: Helvetica, sans-serif;
}

.all-container {
  width: 100vw;
}

#nprogress .bar {
  background: #04aa6d;
  /* 进度条的颜色 */
  height: 5px;
  /* 进度条的高度 */
}

/* 如果使用了旋转加载指示器，也可以自定义它的颜色 */
#nprogress .spinner-icon {
  border-top-color: #29d;
  border-left-color: #29d;
}
</style>
