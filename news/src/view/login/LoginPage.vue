<template>
  <section class="login-page">
    <div>
      <img src="/imgs/login-bg.jpg" class="bg" />
    </div>
    <div class="login">
      <h2>Login</h2>
      <div class="inputBox form-floating mb-3 mt-3">
        <input
          type="text"
          v-model="userName"
          placeholder="Username"
          class="form-control"
          id="Username"
          name="Username"
        />
        <label for="Username">Username</label>
      </div>
      <div class="inputBox form-floating mt-3 mb-3" id="pass">
        <input
          :type="pwdType"
          v-model="userPassword"
          class="form-control"
          id="pwd"
          placeholder="Password"
          name="pswd"
        />
        <label for="pwd">Password</label>
        <span
          v-if="pwdType == 'password'"
          class="iconfont icon-see"
          @click="togglePwdType"
        ></span>
        <span v-else class="iconfont icon-nosee" @click="togglePwdType"></span>
      </div>
      <div class="inputBox">
        <button type="submit" value="Login" id="btn" @click="validateAccount">
          Login
        </button>
      </div>
      <div class="group">
        <RouterLink to="/forget"><button>Forget password</button></RouterLink>
        <RouterLink to="/signup"><button>Sign up</button></RouterLink>
      </div>
    </div>
    <div class="flower">
      <img src="/imgs/flower-pill.jpg" alt="" />
      <img src="/imgs/flower-pill.jpg" alt="" />
      <img src="/imgs/flower-pill.jpg" alt="" />
      <img src="/imgs/flower-pill.jpg" alt="" />
      <img src="/imgs/flower-pill.jpg" alt="" />
      <img src="/imgs/flower-pill.jpg" alt="" />
      <img src="/imgs/flower-pill.jpg" alt="" />
      <img src="/imgs/flower-pill.jpg" alt="" />
    </div>
  </section>
</template>

<script setup>
import axiosRequest from "@/api/axios";
import bcrypt from "bcryptjs";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";
import { encryptPassword } from "@/api/encrypt";
// 引入pinia
import { useStore } from "@/stores";
const store = useStore();
// 接收用户名和密码
const userName = ref(null);
const userPassword = ref(null);
const toastInfo = ref({
  message: "",
  duration: 3000,
  isSuccess: false,
  show: false,
});

let pwdType = ref("password");
function togglePwdType() {
  pwdType.value = pwdType.value === "password" ? "text" : "password";
}
// 验证是否有这个账户
const timeconvert = (string) => {
  const unitConversion = { s: 1, min: 60, h: 3600 };
  const num = parseInt(string.slice(0, -1));
  const unit = string.slice(-1);
  return num * unitConversion[unit] * 1000; //转化为毫秒
};
const formatIpAddress = (ip) => {
  return ip === "::1" ? "127.0.0.1" : ip;
};
async function validateAccount() {
  try {
    const password = await encryptPassword(userPassword.value);
    console.log(password);
    const response = await axiosRequest.post("/api/user/login", {
      username: userName.value,
      password,
    });
    if (response.data.success) {
      console.log(response.data);

      // 设置仓库存储，以及token到期时间
      store.login(true);
      store.setUserAccesstoken(response.data.data.token);
      store.setUserId(response.data.data.userId);
      const start = Date.now();
      const end = start + timeconvert(response.data.data.expireTime);
      store.setExpireTime(end);
      // 显示成功的Toast消息
      const data = response.data.data;
      ElMessage.success(
        ` ${response.data.message}\n
            本次登录信息：
      登录时间：${data.currentLoginTime}
      登录IP：${formatIpAddress(data.currentLoginIp)}\n
      登录浏览器：${data.currentLoginBrowser}\n
      上次登录信息：
      登录时间：${data.lastLoginTime ? data.lastLoginTime : ""}
      登录IP：${data.lastLoginIp ? formatIpAddress(data.currentLoginIp) : ""}\n
      登录浏览器：${data.lastLoginBrowser ? data.lastLoginBrowser : ""}`
      );
      router.replace('/')
    } else {
      // 显示错误消息
      ElMessage.error(response.data.error);
    }
  } catch (error) {
    // 如果请求失败，显示通用错误消息
    console.error("登录失败，未知错误:", error);
    // 显示通用错误消息
    ElMessage.error("登录失败，请稍后重试");
  }
}
</script>



<style scoped>
@import "/iconfont/iconfont.css";
@import "../../../node_modules/bootstrap/";

.login-page {
  width: 100vw;
  height: 100vh;
}

.icon-nosee {
  display: block !important;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

a {
  text-decoration: none;
}

section {
  position: relative;
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

section .bg {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  object-fit: 100%;
}

.login {
  position: relative;
  width: 500px;
  min-height: 300px;
  padding: 60px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.25);
  background-clip: blur(3px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 25px 25px rgba(0, 0, 0, 0.2);
}

section h2 {
  position: relative;
  text-align: center;
  width: 100%;
  font-size: 1.25em;
  font-weight: 500;
  color: #8f2c2c;
  margin-bottom: 10px;
}

.login {
  position: relative;
}

.login .inputBox {
  position: relative;
}

.login .inputBox input {
  position: relative;
  width: 100%;
  outline: none;
  color: #8f2c2c;
  border-radius: 5px;
  background: #fff;
  border: none;
  margin-bottom: 20px;
}

.login .inputBox button {
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
}

.login .group {
  display: flex;
  justify-content: space-between;
}

.login .group button {
  font-size: 1.1em;
  color: #8f2c24;
  font-weight: 500;
  border: none;
  background-color: inherit;
}

.login .inputBox span {
  position: absolute;
  right: 0;
  top: 9px;
  font-size: 28px;
  color: #8f2c24;
  cursor: pointer;
}

.login .inputBox .icon-see {
  display: block;
}

.login .inputBox .icon-nosee {
  display: none;
}

section .flower {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.flower img {
  position: absolute;
  width: 100%;
  height: auto;
  width: 20px;
  height: auto;
}

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

.flower img:nth-child(1) {
  left: 20%;
  animation: flowerMove 20s linear infinite;
}

.flower img:nth-child(2) {
  left: 50%;
  animation: flowerMove 14s -2s linear infinite;
}

.flower img:nth-child(3) {
  left: 70%;
  animation: flowerMove 12s -3s linear infinite;
}

.flower img:nth-child(4) {
  left: 5%;
  animation: flowerMove 15s -2s linear infinite;
}

.flower img:nth-child(5) {
  left: 85%;
  animation: flowerMove 18s -1s linear infinite;
}

.flower img:nth-child(6) {
  left: 90%;
  animation: flowerMove 12s -1s linear infinite;
}

.flower img:nth-child(7) {
  left: 15%;
  animation: flowerMove 14s -2s linear infinite;
}

.flower img:nth-child(8) {
  left: 60%;
  animation: flowerMove 15s -1s linear infinite;
}
</style>../../../router@/api/request