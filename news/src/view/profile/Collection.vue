<script setup>
import request from "@/utils/request";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores";
import { useStore } from "@/stores";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const store = useStore();
const router = useRouter();

const loadingText = ref("加载中");
const historyList = ref([]);
const sumList = ref([]);
const infiniteScrollDisabled = ref(true);
const infiniteScrollLoading = ref(true);
const length = ref(0);
// 格式化时间函数，将UTC化为标准
const formatDate = (dateStr) => {
  return dayjs(dateStr).format("YYYY-MM-DD HH:mm:ss");
};
// 刚开始获取历史记录函数
const getHistoryList = async () => {
  const userid = store.getUserId();
  const res = await userStore.loadHistory(userid);
  sumList.value = res.data;
  console.log(sumList.value);
  historyList.value = [...historyList.value, ...sumList.value.slice(0, 10)];
  length.value += 10;
  infiniteScrollLoading.value = false; // 初次加载完成后，隐藏加载状态
  infiniteScrollDisabled.value = false; // 启用无限滚动
  console.log(historyList.value);
};
getHistoryList();
// 触发底部加载函数
const load = () => {
  console.log(1);
  console.log(length.value);
  if (length.value >= sumList.value.length) {
    infiniteScrollDisabled.value = true; // 禁用无限滚动
    return;
  }
  infiniteScrollLoading.value = true;
  // 模拟加载时间
  setTimeout(() => {
    historyList.value = [
      ...historyList.value,
      ...sumList.value.slice(length.value, length.value + 10),
    ];
    length.value += 10;
    infiniteScrollLoading.value = false;
  }, 100); // 1秒延迟模拟
};
</script>

<template>
  <div class="scroll-container">
    <ul
      style="overflow: auto"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="infiniteScrollDisabled"
      infinite-scroll-distance="10"
    >
      <li v-for="item in historyList" :key="item.id">
        <el-card shadow="hover"
          ><RouterLink
            :to="{
              name: 'articleDetail',
              params: { id: item.article_id, category: item.article_category },
            }"
            >{{ item.article_title }}</RouterLink
          ><span>{{ formatDate(item.article_time) }}</span></el-card
        >
      </li>
    </ul>
    <el-loading v-if="infiniteScrollLoading" :text="loadingText"></el-loading>
  </div>
</template>


<style lang="scss" scoped>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.el-card {
  position: relative;
  background-color: $color-bg;
}
.el-card:hover {
  background-color: $color-accent;
  cursor: pointer;
}
.el-card {
  a{
    color: $color-text;
  }
  span {
    position: absolute;
    right: 20px;
  }
}
</style>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  ul {
    height: 100%;
    overflow: auto;
  }
}
</style>