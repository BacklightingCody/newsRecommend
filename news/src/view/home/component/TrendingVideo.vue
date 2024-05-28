<template>
    <div class="trendingvideo-container">
        <div class=" news-container-tltle">
            <a href="#" class="news-container-title">#热门视频</a>
            <ul class="trending-video">
                <li v-for="(item, index) in tredningvideo" :key='index' class="trending-video-item" :title="item.title">
                    <span class="item-num">{{index+1}}</span>
                    {{ item.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import tredningvideo from '../../../assets/data/trendingVideos.json';
</script>

<style lang="scss" scoped>
.trendingvideo-container{
    width: 100%;
    .news-container-title{
        display: block;
        color: $color-text;
        font: $text-title;
        padding: 10px;
        font-size: 1.5em;
    }
    .trending-video {
        .trending-video-item {
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
        .trending-video-item:nth-child(1) .item-num{
            background-color: red;
        }
        .trending-video-item:nth-child(2) .item-num{
            background-color: orangered;
        }
        .trending-video-item:nth-child(3) .item-num{
            background-color: orange;
        }
        .trending-video-item:hover {
            text-decoration: solid underline brown 3px;
            transform: scale(1.05);
            cursor: pointer;
        }
    }
}
</style>