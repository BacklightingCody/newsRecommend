<template>
    <section class="forget-page">
        <div>
            <img src="/imgs/login-bg.jpg" class="bg">
        </div>
        <div class="forget-container">
            <h2>找回密码</h2>
            <div class="inputBox form-floating mb-3 mt-3">
                <input type="text" placeholder="Username" v-model="username" class="form-control" id="Username"
                    name="Username">
                <label for="Username">请输入用户名</label>
                <button type="submit" value="nextStep" id="btn" @click="handleForget">确认</button>
            </div>
        </div>
        <div class="flower">
            <img src="/imgs/flower-pill.jpg" alt="">
            <img src="/imgs/flower-pill.jpg" alt="">
            <img src="/imgs/flower-pill.jpg" alt="">
            <img src="/imgs/flower-pill.jpg" alt="">
            <img src="/imgs/flower-pill.jpg" alt="">
            <img src="/imgs/flower-pill.jpg" alt="">
            <img src="/imgs/flower-pill.jpg" alt="">
            <img src="/imgs/flower-pill.jpg" alt="">
        </div>
    </section>
</template>

<script setup>
import axiosRequest from '../../api/axios';
import { ref } from 'vue';
const username = ref(null)
async function handleForget() {
    // 进行表单数据发送
    try {
        console.log(username.value)
        const response = await axiosRequest.post('/api/user/forget', {
            username: username.value,
        });
        // 如果后端返回的success为true，则显示成功消息
        if (response.data.success) {
            console.log(response.data.message);
            // 显示成功的Toast消息
            store.signUp(username.value, password.value)
            await showSuccess(response.data.message);
        } else {
            // 显示错误消息
            await showError(response.data.error);
        }
    } catch (error) {
        // 如果请求失败，显示通用错误消息
        console.error("找回失败，未知错误:", error);
        // 显示通用错误消息
        await showError('找回失败，请稍后重试');
    }
}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/bootstrap/';

.forget-page {
    width: 100vw;
    height: 100vh;
}

section {
    position: relative;
    width: 100%;
    height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .bg {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        object-fit: 100%;

    }

    .forget-container {
        position: relative;
        width: 500px;
        min-height: 300px;
        padding: 50px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.25);
        background-clip: blur(3px);
        display: flex;
        flex-direction: column;
        gap: 20px;
        box-shadow: 0 25px 25px rgba(0, 0, 0, 0.2);

        h2 {
            position: relative;
            text-align: center;
            width: 100%;
            font-size: 1.5em;
            font-weight: 500;
            color: #8f2c2c;
        }

        .inputBox {
            position: relative;
            margin-bottom: 15px;

            input {
                position: relative;
                width: 100%;
                outline: none;
                color: #8f2c2c;
                border-radius: 5px;
                background: #fff;
                border: none;
            }

            button {
                display: block;
                width: 100%;
                height: 50px;
                position: relative;
                border: none;
                outline: none;
                background-color: #8f2c2c;
                cursor: pointer;
                color: #fff;
                font-size: 1.25em;
                font-weight: 100;
                margin-top: 50px;
            }
        }


    }

    /*花瓣*/
    .flower {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;

        img {
            position: absolute;
            width: 100%;
            height: auto;
            width: 20px;
            height: auto;
        }

        img:nth-child(1) {
            left: 20%;
            animation: flowerMove 20s linear infinite;
        }

        img:nth-child(2) {
            left: 50%;
            animation: flowerMove 14s -2s linear infinite;
        }

        img:nth-child(3) {
            left: 70%;
            animation: flowerMove 12s -3s linear infinite;
        }

        img:nth-child(4) {
            left: 5%;
            animation: flowerMove 15s -2s linear infinite;
        }

        img:nth-child(5) {
            left: 85%;
            animation: flowerMove 18s -1s linear infinite;
        }

        img:nth-child(6) {
            left: 90%;
            animation: flowerMove 12s -1s linear infinite;
        }

        img:nth-child(7) {
            left: 15%;
            animation: flowerMove 14s -2s linear infinite;
        }

        img:nth-child(8) {
            left: 60%;
            animation: flowerMove 15s -1s linear infinite;
        }

        /*花瓣动画*/
        @keyframes flowerMove {
            0% {
                opacity: 0;
                top: -10px;
                transform: translateX(20px) rotate(0deg);
            }

            10% {
                opacity: 1;
            }

            20% {
                transform: translateX(-20px) rotate(45deg);
            }

            40% {
                transform: translateX(-20px) rotate(90deg);
            }

            60% {
                transform: translateX(20px) rotate(180deg);
            }

            80% {
                transform: translateX(-20px) rotate(45deg);
            }

            100% {
                top: 110%;
                transform: translateX(20px) rotate(225deg);
            }
        }
    }
}
</style>@/api/request