<template>
  <div class="person-field-container">
    <v-form :disabled="isDisabled">
      <form @submit.prevent="submit" class="person-form">
        <div class="person-form-left">
          <v-text-field
            v-model="name.value.value"
            :counter="10"
            :error-messages="name.errorMessage.value"
            label="Name"
          ></v-text-field>

          <v-text-field
            v-model="phone.value.value"
            :counter="11"
            :error-messages="phone.errorMessage.value"
            label="Phone Number"
          ></v-text-field>
          <v-select
            v-model="gender.value.value"
            :error-messages="gender.errorMessage.value"
            :items="itemsGender"
            label="Gender"
          ></v-select>

          <v-select
            v-model="Interestselect.value.value"
            :error-messages="Interestselect.errorMessage.value"
            :items="items"
            multiple
            label="Interest"
          ></v-select>
        </div>
        <div class="person-form-right">
          <v-select
            v-model="addressSelect.value.value"
            :error-messages="addressSelect.errorMessage.value"
            :items="itemsAddress"
            label="Address"
          ></v-select>
          <v-text-field
            v-model="profession.value.value"
            :counter="10"
            :error-messages="profession.errorMessage.value"
            label="Profession"
          ></v-text-field>
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
          ></v-text-field>

          <!-- <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                        label="E-mail"></v-text-field> -->
        </div>
        <div class="person-form-bottom">
          <v-textarea
            label="Biography"
            variant="solo-filled"
            v-model="textArea"
            placeholder="Write some self-descriptions"
          ></v-textarea>
          <v-btn class="me-4" type="submit" @click="affirmEdit">确认</v-btn>
          <v-btn @click="toggleEdit" ref="editBtn">编辑</v-btn>
        </div>
      </form>
    </v-form>
  </div>
</template>
<script setup>
import axiosRequest from "@/api/axios";
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import {
  VBtn,
  VTextField,
  VSelect,
  VForm,
  VTextarea,
} from "vuetify/lib/components/index.mjs";
import { useStore } from "@/stores";
const Store = useStore();
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const Interestselect = useField("select");
const profession = useField("profession");
const addressSelect = useField("select");
const gender = useField("select");
const textArea = ref(null);
// const address = useField('address')
const isDisabled = ref(true);
const editBtn = ref(null);
const items = ref([
  "国际",
  "社会",
  "财经",
  "教育",
  "科技",
  "体育",
  "健康",
  "食品",
  "娱乐",
  "时尚",
]);
const itemsAddress = ref([
  "北京市",
  "天津市",
  "河北省",
  "山西省",
  "内蒙古自治区",
  "辽宁省",
  "吉林省",
  "黑龙江省",
  "上海市",
  "江苏省",
  "浙江省",
  "安徽省",
  "福建省",
  "江西省",
  "山东省",
  "河南省",
  "湖北省",
  "湖南省",
  "广东省",
  "广西壮族自治区",
  "海南省",
  "重庆市",
  "四川省",
  "贵州省",
  "云南省",
  "西藏自治区",
  "陕西省",
  "甘肃省",
  "青海省",
  "宁夏回族自治区",
  "新疆维吾尔自治区",
  "台湾省",
  "香港特别行政区",
  "澳门特别行政区",
]);
const itemsGender = ref(["男", "女"]);

// const submit = handleSubmit(values => {
//     alert(JSON.stringify(values, null, 2))
// })
function toggleEdit() {
  isDisabled.value = !isDisabled.value;
}
// 拿取用户信息
getUserInfos();
async function getUserInfos() {
  try {
    const token = Store.userAccount.accessToken; // 从localStorage中获取JWT令牌
    // console.log(token,1)
    const userId = Store.userAccount.userid;
    // console.log(userId)
    // console.log(userId);
    const response = await axiosRequest.get("/profile/getInfo", {
      headers: {
        Authorization: token,
      },
      params: {
        userId: userId,
      },
    });
    if (response.data.success) {
      // 显示成功的消息
      const userInfo = response.data.data;
      console.log(userInfo.userInfos);
      // 个人信息设置
      name.value.value = userInfo.userInfos.name;
      addressSelect.value.value = userInfo.userInfos.addressSelect;
      profession.value.value = userInfo.userInfos.profession;
      phone.value.value = userInfo.userInfos.phoneNumber;
      gender.value.value = userInfo.userInfos.gender;
      Interestselect.value.value = userInfo.userInfos.interest;
      email.value.value = userInfo.userInfos.Email;
      textArea.value = userInfo.userInfos.Biography;
      ElMessage.success(response.data.message);
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    // 请求失败的处理逻辑
    console.error("Error:", error);
  }
}
async function affirmEdit() {
  try {
    const userInfos = {
      name: name.value.value,
      addressSelect: addressSelect.value.value,
      profession: profession.value.value,
      phoneNumber: phone.value.value,
      gender: gender.value.value,
      interest: Interestselect.value.value,
      Email: email.value.value,
      Biography: textArea.value,
    };
    console.log(userInfos);
    const token = Store.userAccount.accessToken; // 从localStorage中获取JWT令牌
    // console.log(token,1)
    const userId = Store.userAccount.userid;

    // console.log(userId);
    const response = await axiosRequest.post(
      "/profile/updateInfo",
      { userId, userInfos },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // 已发送带有token的请求头
    if (response.data.success) {
      // 显示成功的消息
      ElMessage.success(response.data.message);
    } else {
      ElMessage.error(response.data.message);
    }
    isDisabled.value = !isDisabled.value;
  } catch (error) {
    // 请求失败的处理逻辑
    console.error("Error:", error);
  }
}
</script>
<style scoped lang="scss">
.person-field-container {
  width: 100%;
  height: 100%;

  .v-form {
    position: relative;
    width: 100%;
    height: 100%;
    flex-direction: row;

    .person-form {
      display: flex;
      width: 100%;

      .person-form-left,
      .person-form-right {
        width: 40%;
        margin: 20px;
      }

      .person-form-bottom {
        width: 85%;
        position: absolute;
        margin: 20px;
        bottom: 0;
      }
    }
  }
}
</style>
