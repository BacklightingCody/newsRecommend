<template>
  <section class="login-page">
    <div>
      <img src="../../assets/imgs/login-bg.jpg" class="bg" />
    </div>
    <div class="signup">
      <h2>Signup</h2>
      <div
        class="inputBox form-floating mb-3 mt-3"
        @change="validateSignup.validateUsername"
        :class="{ 'is-valid': usernameValid, 'is-invalid': usernameInValid }"
      >
        <input
          type="text"
          placeholder="Username"
          v-model="username"
          class="form-control"
          id="Username"
          name="Username"
        />
        <label for="Username">Username</label>
      </div>
      <div
        class="inputBox form-floating mt-3 mb-3"
        id="pass"
        @change="validateSignup.validatePwd"
        :class="{ 'is-valid': passwordValid, 'is-invalid': passwordInValid }"
      >
        <input
          :type="pwdType.pwd"
          v-model="password"
          class="form-control"
          id="pwd"
          placeholder="Password"
          name="pswd"
        />
        <label for="pwd">Password</label>
        <span
          v-if="pwdType.pwd == 'password'"
          class="iconfont icon-see"
          @click="togglePwdType('pwd')"
        ></span>
        <span
          v-else
          class="iconfont icon-nosee"
          @click="togglePwdType('pwd')"
        ></span>
      </div>
      <div
        class="inputBox form-floating mt-3 mb-3"
        id="passRe"
        @change="validateSignup.validatePwdRepeat"
        :class="{
          'is-valid': passwordReValid,
          'is-invalid': passwordReInValid,
        }"
      >
        <input
          :type="pwdType.pwdRe"
          v-model="passwordRepeat"
          class="form-control"
          id="pwdRe"
          placeholder="Repeat Password"
          name="pswdRe"
        />
        <label for="pwdRe">Repeat Password</label>
        <span
          v-if="pwdType.pwdRe == 'password'"
          class="iconfont icon-see"
          @click="togglePwdType('pwdRe')"
        ></span>
        <span
          v-else
          class="iconfont icon-nosee"
          @click="togglePwdType('pwdRe')"
        ></span>
      </div>
      <div class="inputBox">
        <button
          type="button"
          value="Signup"
          id="btn"
          :disabled="IsSignup"
          @click="handleSignupSuccess"
        >
          Signup
        </button>
      </div>
      <div class="group">
        <RouterLink to="/"><button>Other mothods</button></RouterLink>
        <RouterLink to="/login"><button>Login</button></RouterLink>
      </div>
    </div>
    <div class="flower">
      <img src="../../assets/imgs/flower-pill.jpg" alt="" />
      <img src="../../assets/imgs/flower-pill.jpg" alt="" />
      <img src="../../assets/imgs/flower-pill.jpg" alt="" />
      <img src="../../assets/imgs/flower-pill.jpg" alt="" />
      <img src="../../assets/imgs/flower-pill.jpg" alt="" />
      <img src="../../assets/imgs/flower-pill.jpg" alt="" />
      <img src="../../assets/imgs/flower-pill.jpg" alt="" />
      <img src="../../assets/imgs/flower-pill.jpg" alt="" />
    </div>
  </section>
</template>

<script setup>
import axiosRequest from "@/api/axios";
import request from "@/utils/request";
// import axios from 'axios'
import { ref, computed, defineEmits } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";
import { useStore } from "@/stores";
// 引入加密方法
import { encryptPassword } from "@/api/encrypt";
const store = useStore();
// emit事件
const emits = defineEmits(["signSuccess"]);
// 表单数据
const username = ref(null);
const password = ref(null);
const passwordRepeat = ref(null);
// 表单是否符合检测
const usernameValid = ref(null);
const passwordValid = ref(null);
const passwordReValid = ref(null);
const usernameInValid = ref(null);
const passwordInValid = ref(null);
const passwordReInValid = ref(null);
const initInfo = {
  name: "",
  addressSelect: "",
  profession: "",
  phoneNumber: "",
  gender: "",
  interest: "",
  Email: "",
  Biography: "",
};
// 表单成功或错误提示
const toastInfo = ref({
  message: "",
  duration: 2000,
  isSuccess: false,
  show: false,
});
// 对密码输入框的眼睛处理
const pwdType = ref({
  pwd: "password",
  pwdRe: "password",
});
function togglePwdType(field) {
  pwdType.value[field] =
    pwdType.value[field] === "password" ? "text" : "password";
}
// 表单验证部分
const validateSignup = {
  validateUsername,
  validatePwd,
  validatePwdRepeat,
};
function validateUsername() {
  if (username.value.length < 1) {
    showError("The username cannot be empty");
    usernameInValid.value = true;
    return "The username cannot be empty ";
  } else {
    usernameInValid.value = false;
    usernameValid.value = true;
  }
}
function validatePwd() {
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(
      password.value
    )
  ) {
    passwordInValid.value = true;
    showError(
      "The password must be at least eight digits and have at least one uppercase letter, one lowercase letter, a number and one special character"
    );
    return "password length can not less than 8";
  } else {
    passwordInValid.value = false;
    passwordValid.value = true;
  }
}
function validatePwdRepeat() {
  if (passwordRepeat.value !== password.value) {
    passwordReInValid.value = true;
    showError("two inputThe two inputs are inconsistent");
    return "two inputThe two inputs are inconsistent";
  } else {
    passwordReInValid.value = false;
    passwordReValid.value = true;
  }
}
// 对是否可以点击注册按钮进行限制
const IsSignup = computed(() => {
  return !(usernameValid.value && passwordValid.value && passwordReValid.value);
});

async function handleSignupSuccess() {
  // 进行表单数据发送
  try {
    const encryptpassword = await encryptPassword(password.value);
    const response = await axiosRequest.post("/api/user/signup", {
      username: username.value,
      password: encryptpassword,
      initInfo,
    });
    // 如果后端返回的success为true，则显示成功消息
    if (response.data.success) {
      console.log(response.data.message);
      // 显示成功的Toast消息
      // store.signUp(username.value,password.value)
      ElMessage.success(response.data.message);
      router.replace('/login')
    } else {
      // 如果后端返回的success为false，则显示错误消息
      // console.error("注册失败:", response.data.error);
      // 显示错误消息
      ElMessage.error(response.data.error);
    }
  } catch (error) {
    // 如果请求失败，显示通用错误消息
    console.error("注册失败，未知错误:", error);
    // 显示通用错误消息
    ElMessage.error("注册失败，请稍后重试");
  }
}
</script>



<style scoped lang="scss">
@import "../../../public/iconfont/iconfont.css";
@import "../../../node_modules/bootstrap/";

.icon-nosee {
  display: block !important;
}

.login-page {
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

  .signup {
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
      }

      button[disabled] {
        cursor: not-allowed;
      }

      span {
        position: absolute;
        right: 0;
        top: 9px;
        font-size: 28px;
        color: #8f2c24;
        cursor: pointer;
      }

      .icon-see {
        display: block;
      }

      .icon-nosee {
        display: none;
      }
    }

    /*表单验证颜色*/
    .inputBox.is-valid {
      border: solid 3px #3cbc8d;
      border-radius: 5px;
    }

    .inputBox.is-invalid {
      border: solid 3px #dc3545;
      border-radius: 5px;
    }

    .group {
      display: flex;
      justify-content: space-between;

      button {
        font-size: 1.1em;
        color: #8f2c24;
        font-weight: 500;
        border: none;
        background-color: inherit;
      }
    }
  }

  /*关于花瓣的*/
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
</style>../../../router@/api/request