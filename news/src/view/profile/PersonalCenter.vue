

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import router from "@/router";
import { useStore } from "@/stores";
const store = useStore();


// 控制是否登出
let loggingOut = false;

function handleLogOut() {
  if (loggingOut) {
    return; // 如果正在登出，不允许再次点击
  }
  loggingOut = true; // 设置登出状态为 true
  store.logout();
  ElMessage.success("退出成功，即将返回主页");
  setTimeout(() => {
    router.replace("/");
    loggingOut = false; // 在页面跳转完成后重置登出状态
  }, 1000);
}
</script>


<template>
  <section class="personal">

    <div class="back-home">
      <RouterLink to="/">返回主页</RouterLink>
    </div>
    <div class="personal-container">
      <aside>
        <ul>
          <li><router-link to="/personal/profile">Profile</router-link></li>
          <li><router-link to="/personal/security">Security</router-link></li>
          <li><a href="#">Collection</a></li>
          <li @click="handleLogOut"><a href="#">LogOut</a></li>
        </ul>
      </aside>
      <div class="content-container">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.personal {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fbfbea;
  display: flex;
  align-items: center;
  justify-content: center;

  .back-home {
    position: absolute;
    top: 10px;
    left: 10px;
    border: solid 2px #333;
    border-radius: 5px;
    padding: 10px;

    a {
      color: #000;
    }

    a:hover {
      background-color: #111;
      color: #fff;
    }
  }

  .personal-container {
    display: flex;
    width: 80%;
    height: 80%;
    border: solid 3px #333;
    border-radius: 10px;

    aside {
      width: 15%;
      height: 100%;
      border-right: solid 2px #333;

      ul {
        padding-left: 0;

        li {
          text-align: center;
          width: 100%;
          border-bottom: solid 2px #000;
          padding: 10px;

          a {
            color: #000;
          }
        }

        li:hover {
          cursor: pointer;
          background-color: #333;

          a {
            color: #fff;
          }
        }
      }
    }

    .content-container {
      width: 85%;
      height: 100%;
      border-left: 0;
    }
  }
}
</style>