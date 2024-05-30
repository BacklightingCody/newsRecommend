<script setup>
import { ref } from "vue";
import { searchQuery } from "@/api/search";

const queryString = ref(null);

const lookfor = async (query) => {
  try {
    const response = await searchQuery(query);
    return response.data;
  } catch (error) {
    console.error("搜索失败:", error);
    return [];
  }
};

const createFilter = (results) => {
  return results.slice(0, 10);
};

let timeout;

const searchAsync = (query, cb) => {
  clearTimeout(timeout);

  if (!query) {
    cb([]);
    return;
  }

  // 发起搜索请求
  timeout = setTimeout(async () => {
    const results = await lookfor(query);
    const filteredResults = createFilter(results);
    cb(filteredResults);
  }, 300); // 300ms 防抖
};

const handleSelect = (item) => {
  console.log(item);
};
</script>
<template>
  <div class="search-container">
    <el-autocomplete
      v-model="queryString"
      placeholder="Search..."
      @select="handleSelect"
      :fetch-suggestions="searchAsync"
      popper-class="custom-autocomplete-dropdown"
    >
      <template #prefix>
        <i class="iconfont icon-fangdajing" @click="searchIconClick"></i>
      </template>
      <template #default="{ item }">
        <div class="suggestion-item">
          <a :href="item.link" target="_blank" class="link">{{ item.title }}</a>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>



<style lang="scss" scoped>
.search-container {
  position: relative;
  margin: 0 20px;
  :deep(.el-autocomplete) {
    width: 600px;
    transition: all 0.5s ease;

    .el-input {
      flex-grow: 1;
      width: 100%;
      height: 40px;
      outline: none;

      .el-input__wrapper {
        background-color: $color-bg;
        color: $color-text;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.suggestion-item a {
  text-decoration: none;
  color: inherit;
}

.suggestion-item a:hover {
  color: #1890ff;
}
</style>