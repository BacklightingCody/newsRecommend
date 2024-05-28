<template>
  <RouterLink :to="jumpPage">
    <div class="user-portrait-container">
      <img :src="userImgSrc" alt="" ref="portraitImg" />
    </div>
  </RouterLink>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import { RouterLink } from "vue-router";
import { useStore, useUserStore } from "@/stores";

const store = useStore();
const userStore = useUserStore();
const props = defineProps({
  theme: String,
});
// console.log(userStore.UserPortrait,2)
const userImgSrc = computed(() => {
  //   return ((store.userAccount.loggedIn&&userStore.UserPortrait)?userStore.UserPortrait:(props.theme === 'light' ? '/imgs/未登录.png' : '/imgs/未登录dark.png'));
  return userStore.UserPortrait
    ? userStore.UserPortrait
    : props.theme === "light"
    ? "/imgs/未登录.png"
    : "/imgs/未登录dark.png";
});
const jumpPage = computed(() => {
  return store.userAccount.loggedIn ? "/personal" : "/login";
});
</script>

<style lang="scss" scoped>
.user-portrait-container {
  width: 100%;
  height: 100%;
  border: solid 1px $color-text;
  border-radius: 50%;
  text-align: center;
  line-height: 100%;
  cursor: pointer;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>../../stores