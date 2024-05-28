<template>
  <header id="header">
    <!-- <div id="logo"><img src="../../public/imgs/dark_logo.png" alt=""></div> -->
    <div id="logo"><img :src="logoSrc" alt=""></div>
    
    <Search id="search" />
    <ThemeSwitch @theme-changed="handleThemeChange" id="switch-theme"></ThemeSwitch>
    <Login id="login"></Login>
    <UserPortraitComponent id="user-portrait" :theme='currentTheme'></UserPortraitComponent>
  </header>

</template>

<script setup>
import Search from './Search.vue';
import ThemeSwitch from './ThemeSwitch.vue';
import Login from './Login.vue';
import UserPortraitComponent from './UserPortrait.vue';
import { ref, computed, watchEffect } from 'vue';

// 创建一个响应式引用来存储当前主题
const currentTheme = ref(localStorage.getItem('theme') || 'light');

const logoSrc = computed(() => {
  return currentTheme.value === 'light' ? '/imgs/light_logo.png' : '/imgs/dark_logo.png';
});

function handleThemeChange(newTheme) {
  currentTheme.value = newTheme;
}




</script>

<style scoped lang="scss">

#header {
  position: relative;
  display: flex;
  justify-content: end;
  height: 100px;
  width: 100%;
  padding-right: 5%;
  align-items: center;
  background-color: $color-bg;
  border-bottom: $border-2;

  #logo {
    position: absolute;
    left: 0;
    width: 380px;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  #login {
    ::v-deep #login button {
      background-color: $color-bg;
      color: $color-text;
      border-color: #111;
    }
  }
  #user-portrait{
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }

}
</style>