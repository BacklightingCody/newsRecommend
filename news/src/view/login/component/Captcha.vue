

<script setup>
import { ref } from "vue";
const captchaInput = ref();
const message = ref()
const reloadCaptcha = () => {};
const verifyCaptcha = () => {};
</script>
<template>
  <div>
    <img :src="captchaUrl" alt="Captcha Image" />
    <button @click="reloadCaptcha">Reload Captcha</button>
    <div>
      <input v-model="captchaInput" placeholder="Enter Captcha" />
      <button @click="verifyCaptcha">Submit</button>
    </div>
    <div v-if="message">{{ message }}</div>
  </div>
</template>
<style lang="scss" scoped>
</style>