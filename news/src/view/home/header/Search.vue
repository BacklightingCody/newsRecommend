<script setup>
import { ref } from "vue";
import { searchQuery } from "@/api/search";
import { RouterLink } from "vue-router";
const queryString = ref(null);
import router from "@/router";
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
  console.log(item)
  if (item) {
    router.push({
      name: "articleDetail",
      params: { id: item.id, category: item.table_name },
    });
  }
  return item;
};
const highlight = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const hightext = String(regex).replace(/[()/]/g, "").slice(0, -2);
  // console.log(hightext)
  console.log(text.replace(hightext, `<em class="highlight">${hightext}</em>`));
  return text.replace(hightext, `<em class="highlight">${hightext}</em>`);
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
          <!-- <a :href="item.link" target="_blank" class="link">{{ item.title }}</a> -->
          <a
            target="_blank"
            class="link"
            v-html="highlight(item.title, queryString)"
          ></a>
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
:deep(.highlight) {
  font-style: normal;
  font-weight: 400;
  background-color: yellow;
}
</style>
<style lang="scss" scoped>
.suggestion-item a {
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.suggestion-item a:hover {
  color: #1890ff;
}
</style>