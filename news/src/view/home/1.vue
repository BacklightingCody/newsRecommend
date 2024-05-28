<script setup>
// 引入关于vue的东西
import { RouterView } from "vue-router";
import { ref, computed, onMounted, h } from "vue";
// 引入store
import { useStore } from "../stores";

import { getPolitical,getSociety,getInternational,getEconomy,getTechnology,getHealth } from "@/api/getNews";
// 引入组件
import HeaderComponent from "./Header.vue";
import NavbarComponent from "./NavBar.vue";
import CarouselComponent from "./Carousel.vue";
import SidebarComponent from "./SideBar.vue";
import VideoNewsComponent from "./VideoNews.vue";
import NewsSectionComponent from "./NewsSection.vue";
import BreakNewsComponent from "./BreakNews.vue";
import TrendingImgsComponent from "./TrendingImgs.vue";
import LoginPage from "./view/LoginPage.vue";

import TrendingVideoComponent from "./TrendingVideo.vue";
// import NewsModuleComponent from './NewsModuleComponent.vue';
import FooterComponent from "./Footer.vue";
// // 引入数据
// 引入图片
import political from "@/assets/imgs/political.jpg";
import society from "@/assets/imgs/society.jpg";
import international from "@/assets/imgs/international.jpg";
import economy from "@/assets/imgs/economy.jpg";
import village from "@/assets/imgs/village.jpg";
import health from "@/assets/imgs/health.jpg";
import technology from '@/assets/imgs/technology.jpg'
import img1 from "@/assets/imgs/video-img-1.png";
import img2 from "@/assets/imgs/video-img-2.jpg";
import img3 from "@/assets/imgs/video-img-3.jpeg";
import img4 from "@/assets/imgs/video-img-4.webp";
import img5 from "@/assets/imgs/video-img-5.jpeg";
import img6 from "@/assets/imgs/video-img-6.jpeg";

const videoList = [img1, img2, img3, img4, img5, img6];
// console.log(videoList)
const imgList = [political, society, international, economy, technology, health];
// console.log(imgList)
// 执行代码

// 声明属性

const store = useStore();
const politicalNews = ref([]);
const societyNews = ref([])
const internationalNews = ref([])
const economyNews = ref([])
const technologyNews = ref([])
const healthNews = ref([])
// 获取新闻列表
// 获取时政
const getPoliticalNews = async () => {
  const res = await getPolitical();
  // console.log(res);
  politicalNews.value = res.data.slice(0, 5);
};
// 获取社会
const getSocietyNews = async () => {
  const res = await getSociety();
  // console.log(res);
  societyNews.value = res.data.slice(0, 5);
};
// 获取国际
const getInternationalNews = async () => {
  const res = await getInternational();
  // console.log(res);
  internationalNews.value = res.data.slice(0, 5);
};
// 获取财经
const getEconomyNews = async () => {
  const res = await getEconomy();
  // console.log(res);
  economyNews.value = res.data.slice(0, 5);
};
// 获取科技
const getTechnologyNews = async () => {
  const res = await getTechnology();
  // console.log(res);
  technologyNews.value = res.data.slice(0, 5);
};
// 获取健康
const getHealthNews = async () => {
  const res = await getHealth();
  // console.log(res);
  healthNews.value = res.data.slice(0, 5);
};
onMounted(() => {
  getPoliticalNews();
  getSocietyNews()
  getInternationalNews()
  getEconomyNews()
  getTechnologyNews()
  getHealthNews()
});
</script>

<template>
  <div class="main-layout">
    <!-- Header -->
    <header-component></header-component>
    <!-- <RouterView name="header"></RouterView> -->
    <!-- Navbar -->
    <!-- <RouterView name="navbar"></RouterView> -->
    <navbar-component></navbar-component>
    <!-- Content Area -->
    <div class="content">
      <!-- Carousel & Sidebar -->
      <div class="top-content">
        <div class="content-gap"></div>
        <div id="carousel">
          <!-- 轮播图组件 -->
          <carousel-component></carousel-component>
        </div>
        <aside class="sidebar">
          <!-- 侧边栏组件 -->
          <Suspense>
            <sidebar-component category="news_table"></sidebar-component>
          </Suspense>
        </aside>
      </div>
      <!-- News Modules -->
      <div class="news-modules">
        <!-- 新闻模块组件 -->
        <!-- 分为左右结构 -->
        <!-- 根据需要复制更多的新闻模块组件 -->
        <div class="content-gap"></div>
        <section class="news-modules-left">
          <VideoNewsComponent :videoList="videoList"></VideoNewsComponent>
          <!-- <VideoNewsComponent></VideoNewsComponent> -->
          <NewsSectionComponent
            :news="politicalNews"
            title="时政"
            category="时政"
            :src="imgList[0]"
          ></NewsSectionComponent>
          <NewsSectionComponent
            :news="societyNews"
            title="社会"
            category="社会"
            :src="imgList[1]"
          ></NewsSectionComponent>
          <NewsSectionComponent
            :news="internationalNews"
            title="国际"
            category="国际"
            :src="imgList[2]"
          ></NewsSectionComponent>
          <NewsSectionComponent
            :news="economyNews"
            title="财经"
            category="财经"
            :src="imgList[3]"
          ></NewsSectionComponent>
          <NewsSectionComponent
            :news="technologyNews"
            title="科技"
            category="科技"
            :src="imgList[4]"
          ></NewsSectionComponent>
          <NewsSectionComponent
            :news="healthNews"
            title="健康"
            category="健康"
            :src="imgList[5]"
          ></NewsSectionComponent>
        </section>
        <section class="news-modules-section"></section>
        <aside class="news-modules-right">
          <BreakNewsComponent category="信息化"></BreakNewsComponent>
          <TrendingImgsComponent></TrendingImgsComponent>
          <TrendingVideoComponent></TrendingVideoComponent>
        </aside>
      </div>
    </div>
    <!-- <router-view name="footer"></router-view> -->
    <FooterComponent :showLink="true"></FooterComponent>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styless/_main";

.main-layout {
  display: block;
  background-color: var(--background);
  width: 100%;
  color: $color-text;

  .content {
    margin-top: 30px;

    .content-gap {
      width: 5%;
    }

    .top-content {
      display: flex;

      #carousel {
        width: 69%;
      }

      .sidebar {
        width: 23%;
        margin-left: 1%;
      }
    }

    .news-modules {
      display: flex;
      margin-bottom: 20px;

      .news-modules-left {
        width: 69%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 15px;
      }

      .news-modules-right {
        padding-top: 10px;
        padding-right: 10px;
        width: 23%;
        margin-left: 1%;
      }
    }
  }
}
</style>
