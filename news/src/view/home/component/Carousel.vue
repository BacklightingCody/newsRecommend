<template>
    <section class="carousel" ref="carouselContainer">
        <button @click="prevSlide" class="iconfont icon-arrowleft1 left-arrow"></button>
        <div class="slides" :style="slidesStyle" x>
            <div v-for="(slide, index) in slides" :key="index" class="slide" @mouseenter="stopAutoplay"
                @mouseleave="startAutoplay">
                <img :src="slide.image" :alt="slide.alt" />
            </div>
        </div>
        <button @click="nextSlide" class="iconfont icon-arrow-right2 right-arrow"></button>
        <div class="indicators">
            <span v-for="(slide, index) in slides" :key="index" @click="goToSlide(index)"
                :class="{ active: index === currentSlide }"></span>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watchEffect, watch } from "vue";
// const emit = defineEmits(['updateSlide'])
const currentSlide = ref(0);
const slideWidth = ref(0);
const carouselContainer = ref(null);
let intervalId = null;

const slides = [
    {
        image: "/imgs/1.jpg",
        alt: "1",
    },
    {
        image: "/imgs/2.jpg",
        alt: "2",
    },
    {
        image: "/imgs/3.jpg",
        alt: "3",
    },
    {
        image: "/imgs/4.jpg",
        alt: "4",
    },
    {
        image: "/imgs/5.jpg",
        alt: "5",
    },
];
const slidesStyle = computed(() => ({
    transform: `translateX(-${(currentSlide.value * 100 * 1) / slides.length}%)`,
}));

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index) => {
    currentSlide.value = index;
};

const startAutoplay = () => {
    intervalId = setInterval(nextSlide, 3000); // 3秒自动切换一次
};

const stopAutoplay = () => {
    clearInterval(intervalId);
};

// onMounted(startAutoplay);
onMounted(() => {
    startAutoplay();
});
onUnmounted(() => {
    stopAutoplay();
});
</script>

<style lang="scss" scoped>
$img-height: 600px;
$slides-length: 5;

.carousel {
    position: relative;
    width: 100%;
    height: $img-height;
    overflow: hidden;

    button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.15);
        color: rgba(255, 255, 255, 0.8);
        padding: 5px 0;
        font-size: 30px;
        cursor: pointer;
        z-index: 2;
        transition: color 0.2s ease;
        border: none;
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.7);
        color: rgba(255, 255, 255, 1);
    }

    .right-arrow {
        padding-left: 5px;
        right: 0;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .left-arrow {
        padding-right: 5px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .slides {
        display: flex;
        width: calc((100%) * ($slides-length));
        transition: transform 0.5s ease;

        .slide {
            width: 100%;
            height: $img-height;

            img {
                width: 100%;
                height: 100%;
                transition: scale 1s ease;
            }

            img:hover {
                scale: 1.1;
            }
        }
    }

    .indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;

        span {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #ccc;
            margin: 0 5px;
            cursor: pointer;
        }

        span.active {
            background-color: #04aa6d;
            padding: 0 10px;
            border-radius: 5px;
        }
    }
}
</style>
