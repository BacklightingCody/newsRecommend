<script setup>
import router from '@/router'
const goback = () => {

  router.push('/')
};
</script>

<template>
  <div class="goback">
    <a href="javascript:;" @click="goback">返回</a>
    <!-- <button  @click="goback">返回</button> -->
  </div>
</template>


<style lang="scss" scoped>

.goback {
  position: relative;
  left: -40px;
  width: 40px;
  height: 40px;
  background-color: inherit;
  border: 1px solid $color-text;
  border-radius: 50%;
  a {
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: inherit;
  }

}
.goback:hover {
  background-color: $color-accent;
}
</style>