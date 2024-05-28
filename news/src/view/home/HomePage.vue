<script setup>
// 引入关于vue的东西
import { RouterView } from "vue-router";
import { ref, computed, onMounted, h } from "vue";
// 引入s性

import { useStore } from "@/stores";

// 引入组件
import HeaderComponent from "./header/Header.vue";
import NavbarComponent from "./navbar/NavBar.vue";
// import LoginPage from "@/view/login/LoginPage.vue";
// import NewsModuleComponent from './NewsModuleComponent.vue';
import FooterComponent from "./footer/Footer.vue";

// 声明属
const store = useStore();
</script>

<template>
  <div class="main-layout">
    <!-- Header -->
    <header-component></header-component>
    <!-- Navbar -->
    <navbar-component></navbar-component>
    <!-- Content Area -->
    <router-view></router-view>
    <FooterComponent :showLink="true"></FooterComponent>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: block;
  background-color: var(--background);
  width: 100%;
  color: $color-text;
}
</style>
