
<script setup>
import GoBack from "./GoBack.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { RouterView, RouterLink } from "vue-router";
import request from "@/utils/request";
import { getDate } from "@/utils/getTime";
const route = useRoute();
import { useUserStore } from "@/stores";
import { useStore } from "@/stores";
const userStore = useUserStore();
const store = useStore();
const category = route.params.category;
const id = route.params.id;
const article = ref(null);
const content = ref([]);
const getArticleDetail = async () => {
  const res = await request.get(`/api/article/${category}/${id}`);
  // console.log(res);
  article.value = res.data;
  console.log(res.data);
  // 对article内容需要处理
  if (res.data && res.data.content) {
    content.value = article.value.content
      .replaceAll("\n", "")
      .replaceAll("　　", "")
      .split("。");
    // console.log(content.value);
  }
};

// 接下来进行历史记录存储
const addArtHistory = async () => {
  const time = getDate();
  const title = article.value?.title;
  const userid = store.getUserId();
  // console.log({ id, category, time, title ,userid});
  await userStore.addHistory({ id, category, time, title,userid });
};

onMounted(async () => {
  await getArticleDetail();
  await addArtHistory();
});
</script>
<template>
  <div class="main-container">
    <!-- <Header></Header>
    <NavBar></NavBar> -->
    <div class="main-content">
      <GoBack></GoBack>
      <section class="content-left" v-if="article?.title">
        <h1>{{ article.title }}</h1>
        <div class="article-info">
          <span class="info-time">{{
            article.time.includes("2024")
              ? article.time
              : "2024 " + article.time
          }}</span>
          <span class="info-author">来源：中国新华网</span>
          <span class="info-font">字体大小操作</span>
        </div>
        <div class="article">
          <p v-for="(item, index) in content" :key="index">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item }}。
          </p>
        </div>
      </section>
      <section class="content-right"></section>
      <div class="comment"></div>
    </div>

    <!-- <Footer :showLink="false"></Footer> -->
  </div>
</template>


<style lang="scss" scoped>
.main-container {
  width: 100vw;
  /*height:100vh;*/
  background-color: $color-bg;
  color: $color-text;
  font-weight: 400;
  .main-content {
    margin-top: 30px;
    min-height: 250px;
    padding-left: 5%;
    display: flex;
    .content-left {
      width: 70%;
      h1 {
        font-size: 2.8rem;
      }
      .article-info {
        position: relative;
        color: $color-accent;
        span {
          margin-right: 30px;
        }
        .info-font {
          position: absolute;
          right: 0;
        }
      }
      .article {
        font-size: 1.5rem;
        line-height: 1.5;
        padding: 20px;
        p {
          margin-bottom: 1em;
        }
      }
    }
    .content-right {
      width: 30%;
      border-left: 2px solid gray;
    }
  }
}
</style>@/api/request