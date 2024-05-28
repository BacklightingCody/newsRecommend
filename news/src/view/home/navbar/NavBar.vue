<script setup>
import { ref, reactive, onMounted, watchEffect, onUnmounted } from 'vue'

const menuItem = reactive([
    {
        id: 0,
        name: '即时'
    },
    {
        id: 1,
        name: '国际'
    },
    {
        id: 2,
        name: '社会'
    },
    {
        id: 3,
        name: '财经'
    },
    {
        id: 4,
        name: '华人'
    },
    {
        id: 5,
        name: '教育'
    },
    {
        id: 6,
        name: '科技'
    },
    {
        id: 7,
        name: '科普'
    },
    {
        id: 8,
        name: '体育'
    },
    {
        id: 9,
        name: '文化'
    },
    {
        id: 10,
        name: '健康'
    },
    {
        id: 11,
        name: '军事'
    },
    {
        id: 12,
        name: '汽车'
    },
    {
        id: 13,
        name: '食品'
    },
    {
        id: 14,
        name: '文体'
    },
    {
        id: 15,
        name: '金融'
    },
    {
        id: 16,
        name: '房产'
    }
    , {
        id: 17,
        name: '乡村振兴'
    }
    , {
        id: 18,
        name: '信息化'
    },
    {
        id: 19,
        name: '旅游'
    },
    {
        id: 20,
        name: '能源'
    },
    {
        id: 21,
        name: '城市'
    },
    {
        id: 22,
        name: '会展'
    },
    {
        id: 23,
        name: '娱乐'
    },
    {
        id: 24,
        name: '时尚'
    },
    {
        id: 25,
        name: '书画'
    },
    {
        id: 26,
        name: '一带一路'
    }
])
// 控制navbar active
const activeItem = ref(menuItem[0].id)
function setActiverItem(id) {
    activeItem.value = id;
}
// 控制navbar scroll
const scrollInterval = ref(null);
const navbarScroll = ref(null)
const showLeftArrow = ref(false);
const showRightArrow = ref(false);

const checkArrows = () => {
    // 控制箭头是否出现
    const navbarElement = navbarScroll.value;
    if (navbarElement) {
        showRightArrow.value = navbarElement.scrollWidth > navbarElement.clientWidth + navbarElement.scrollLeft;
        showLeftArrow.value = navbarElement.scrollLeft > 0;
    }
};
const handleScroll = () => {
    checkArrows();
};

onMounted(() => {
    checkArrows();
});
// k控制左右滑动
// 调整滚动距离和速度
const scrollAmount = 5; // 每次滑动的像素
const scrollSpeed = 20; // 滑动间隔（毫秒）
const scrollRight = () => {
    if (navbarScroll.value) {
        navbarScroll.value.scrollLeft += scrollAmount;
    }
};
const scrollLeft = () => {
    if (navbarScroll.value) {
        navbarScroll.value.scrollLeft -= scrollAmount;
    }
};
const startScrolling = (scrollFunction) => {
    stopScrolling(); // 防止多个定时器同时运行
    scrollFunction();
    scrollInterval.value = setInterval(scrollFunction, scrollSpeed); // 调整间隔以控制滑动速度
};

const stopScrolling = () => {
    if (scrollInterval.value) {
        clearInterval(scrollInterval.value);
        scrollInterval.value = null;
    }
}
onMounted(() => {
    document.addEventListener('mouseup', stopScrolling);
});

onUnmounted(() => {
    document.removeEventListener('mouseup', stopScrolling);
});
watchEffect(() => {
    window.addEventListener('resize', checkArrows);
    return () => {
        window.removeEventListener('resize', checkArrows);
    };
});

</script>
<template>
    <nav id="navbar">
        <span v-if="showLeftArrow" class="scroll-btn btn-left iconfont icon-arrowleft1"
            @mousedown="startScrolling(scrollLeft)" @mouseup="stopScrolling()"></span>
        <ul class="navbar" ref="navbarScroll" @scroll="handleScroll">
            <li v-for="(item, index) in menuItem" :key="index" :class="{ active: activeItem === item.id }"
                @click="setActiverItem(item.id)">
                <a href="#">{{ item.name }}</a>
            </li>
        </ul>
        <span v-if="showRightArrow" class="scroll-btn btn-right iconfont icon-arrow-right2"
            @mousedown="startScrolling(scrollRight)" @mouseup="stopScrolling()"></span>
    </nav>
</template>
<style lang="scss" scoped>

.active {
    background-color: $active-color;
}

#navbar {
    position: sticky;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 10;
    overflow: hidden;
    background-color: $color-bg;
    .btn-left {
        left: 0;
    }

    .btn-right {
        right: 0;
    }

    .scroll-btn {
        display: block;
        padding: 15px;
        position: absolute;
        top: 0;
        cursor: pointer;
        font-size: 16px;
        opacity: 1;
        background-color: $color-accent;
        z-index: 2;
    }

    ul.navbar {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        height: 100%;
        align-items: center;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }

        li a {
            display: inline-block;
            width: auto;
            color: $color-text;
            text-align: center;
            padding: 15px;
            white-space: nowrap;
        }

        li:hover:not(.active) {
            background-color: $color-accent;
        }
    }
}
</style>