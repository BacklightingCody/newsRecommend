<script setup>
import { ref } from "vue";
import { encryptPassword } from "@/api/encrypt";
import request from "@/utils/request";
import { useStore } from "@/stores";
import router from "@/router";
const Store = useStore();
const formModel = ref({
  oldpassword: "",
  newpassword: "",
  repassword: "",
});

const formRef = ref();
// 校验密码输入框
const triggerMethod = "blur";
const validateRepassword = (rule, value, callback) => {
  if (value !== formModel.value.newpassword) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};
const rules = {
  oldpassword: [
    { required: true, message: "请输入你原来的密码", trigger: triggerMethod },
    { pattern: /^\S{8,}$/, message: "密码大于等于8位", trigger: triggerMethod },
  ],
  newpassword: [
    {
      required: true,
      message: "请输入你将要修改的密码",
      trigger: triggerMethod,
    },
    {
      pattern:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "密码必须大于等于8位，且至少含有一个大写字母，一个小写字母，一个数字以及一个特殊字符",
      trigger: triggerMethod,
    },
  ],
  repassword: [
    { required: true, message: "请再次确认你的密码", trigger: triggerMethod },
    {
      validator: validateRepassword,
      trigger: triggerMethod,
    },
  ],
};
// 密码修改提交
const updatePassword = async () => {
  // token已经携带
  try {
    await formRef.value.validate();

    // 加密
    const encryptedPassword = await encryptPassword(
      formModel.value.newpassword
    );
    console.log(encryptedPassword);
    const userId = Store.userAccount.userid;

    const response = await request.post("/profile/updatePassword", {
      userId,
      newPassword: encryptedPassword,
    });
    if (response.data.success) {
      // 显示成功的消息
      console.log(response.data);
      await ElMessage.success(response.data.message);
      router.replace("/login");
    } else {
      await ElMessage.error(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // 处理来自服务器的错误响应
      ElMessage.error(error.response.data.message);
    } else {
      // 处理其他类型的错误
      ElMessage.error(error.message || "未知错误");
    }
    console.error("Error:", error);
  }
};
</script>


<template>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="formModel"
    style="max-width: 600px"
    :rules="rules"
    class="form-box"
    ref="formRef"
  >
    <el-form-item label="原密码" prop="oldpassword">
      <el-input v-model.trim="formModel.oldpassword" />
    </el-form-item>
    <el-form-item label="新密码" prop="newpassword">
      <el-input v-model.trim="formModel.newpassword" />
    </el-form-item>
    <el-form-item label="确认新密码" prop="repassword">
      <el-input v-model.trim="formModel.repassword" />
    </el-form-item>

    <div class="btn-box">
      <el-button @click="updatePassword" size="large" type="warning" plain
        >提交</el-button
      >
      <el-button size="large" type="warning" plain>重置</el-button>
    </div>
  </el-form>
</template>


<style lang="scss" scoped>
.form-box {
  margin: auto;
  margin-top: 50px;
  .el-form-item{
    margin: 20px 0;
  }
  :deep(.el-input__wrapper) {
    background-color: #f7f7e6 !important;
  }
  .el-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px #000 inset;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    .el-button {
      margin: 20px;
      width: 40px;
    }
  }
}
</style>