<template>
    <div class="trendingimgs-container">
        <div class=" news-container-tltle">
            <a href="#" class="news-container-title">#热门图片</a>
            <ul class="trending-imgs">
                <li v-for="(item, index) in trendingImgs" :key='index' class="trending-imgs-item" :title="item.title">
                    <span class="item-num">{{index+1}}</span>
                    {{ item.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import trendingImgs from '../../../assets/data/trendingImgs.json';
</script>

<style lang="scss" scoped>
.trendingimgs-container{
    width: 100%;
    .news-container-title{
        display: block;
        color: $color-text;
        font: $text-title;
        padding: 10px;
        font-size: 1.5em;
    }
    .trending-imgs {
        .trending-imgs-item {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 15px 0;
            transition: all .5s ease;
            span.item-num{
                display: inline-block;
                width: 20px;
                border-radius: 5px;
                text-align: center;
                background-color: $color-accent;
                color: $color-text;
            }
        }
        .trending-imgs-item:nth-child(1) .item-num{
            background-color: red;
            text-decoration-color:red ;
        }
        .trending-imgs-item:nth-child(2) .item-num{
            background-color: orangered;
            text-decoration-color: orangered;
        }
        .trending-imgs-item:nth-child(3) .item-num{
            background-color: orange;
            text-decoration-color:orange ;
        }
        .trending-imgs-item:hover {
            text-decoration: solid underline brown 3px;
            transform: scale(1.05);
            cursor: pointer;
        }
    }
}
</style>