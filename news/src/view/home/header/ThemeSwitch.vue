<template>
    <div class="switch-theme" @click="toggleSwitch();toggleTheme()" ref="switchTheme">
        <div class="switch-slider iconfont icon-taiyang" ref="switchMode"></div>
    </div>
</template>

<script setup>
import {  ref } from 'vue';

const switchTheme = ref(null);
const switchMode = ref(null);
const emit = defineEmits(['theme-changed']);
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const currentSlider = document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme); // 保存用户偏好
    emit('theme-changed', currentTheme);
}
function toggleSwitch() {
    switchTheme.value.classList.toggle("on");
    switchMode.value.classList =switchMode.value.classList== 'switch-slider iconfont icon-yueliang'?'switch-slider iconfont icon-taiyang':'switch-slider iconfont icon-yueliang';
}
// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// 调用初始化函数
initTheme();

</script>

<style lang="scss" scoped>

.switch-theme {
    width: 40px;
    /* 宽度 */
    height: 20px;
    /* 高度 */
    line-height: 20px;
    padding: 1px;
    position: relative;
    background-color: #AAA;
    border-radius: 10px;
    cursor: pointer;
    .switch-slider {
        position: absolute;
        width: 16px;
        /* 滑块宽度 */
        height: 16px;
        /* 滑块高度 */
        transition: all 0.4s ease;
    }

    .icon-taiyang,.icon-yueliang {
        color: yellow;
        font-size: 16px;
    }
}
.on {
    background-color: $color-accent;
    /* 开启时的背景色 */
}
.on .switch-slider {
    transform: translateX(17px);
    /* 根据开关宽度调整 */
}
</style>