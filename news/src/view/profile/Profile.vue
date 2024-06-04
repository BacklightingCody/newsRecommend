<!-- 将来修改流程，前端使用Data Url来预览图片，使用file.reader读取图片为base64格式，然后压缩为blob存储到服务器，服务器需要对blob再转换为base64存储 -->
<template>
  <section class="profile">
    <div class="profile-container">
      <aside class="portrait-container">
        <div class="user-portrait" ref="portraitContainer">
          <div class="user-portrait-mask"></div>
          <UserPortrait ref="userPortrait" class="img-rounded"></UserPortrait>
          <span class="camera">
            <input
              type="file"
              id="uploadPortrait"
              ref="imgInput"
              @change="handleImgInput"
            />
            <img
              src="../../../public/imgs/照相机.png"
              alt=""
              @click="triggerImgInput"
            />
          </span>

          <!-- 只有在选择了图片后才显示裁剪器 -->
        </div>
      </aside>
      <div class="profile-info">
        <div class="crop-img" v-if="imageUrl">
          <vue-cropper
            :src="imageUrl"
            ref="cropper"
            :view-mode="1"
            :drag-mode="'move'"
            :initial-aspect-ratio="1"
            :auto-crop-area="1"
            :min-container-width="200"
            :min-container-height="200"
            :background="false"
            :modal="true"
            :guides="true"
            :highlight="true"
            :crop-box-movable="true"
            :crop-box-resizable="false"
            style="width: 100%; height: 400px"
          ></vue-cropper>
          <button @click="cropImage">裁剪</button>
          <button @click="updateAvatar">确定</button>
          <button @click="hideCropper">取消</button>
        </div>
        <div class="person-info">
          <PersonInfo class="person-field"></PersonInfo>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import axiosRequest from "@/api/axios";
// 引入组件
import UserPortrait from "@/view/home/header/UserPortrait.vue";
import PersonInfo from "./PersonInfo.vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { useUserStore } from "@/stores";
import { useStore } from "@/stores";
const userStore = useUserStore();
const Store = useStore();
const imgInput = ref(null);
const portraitContainer = ref(null);
const userPortrait = ref(null);
const imageUrl = ref(null);
const cropper = ref(null);
const imageFile = ref(null);
function triggerImgInput() {
  imgInput.value.click();
}
function handleImgInput(e) {
  const file = e.target.files[0];
  // console.log(file)
  if (file && file.type.startsWith("image/")) {
    // console.log(userPortrait.value.$refs.portraitImg.value)
    const reader = new FileReader();
    // FileReader.readAsDataURL()
    // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL 格式的 Base64 字符串以表示所读取文件的内容。
    //并且转换为file格式
    reader.readAsDataURL(file);
    reader.onload = () => {
      // 准备上传到服务器的image
      imageFile.value = reader.result;
      // console.log(imageFile.value,11)
    };
    // 前端预览
    imageUrl.value = URL.createObjectURL(file);
    userPortrait.value.$refs.portraitImg.src = imageUrl.value;
  }
}
function cropImage() {
  if (!cropper.value) {
    return;
  }
  // 获取裁剪后的Canvas
  const canvas = cropper.value.getCroppedCanvas();
  // console.log(cropper.value)
  canvas.toBlob((blob) => {
    // 处理裁剪后的图片文件，例如上传到服务器
    // console.log(blob);
    // 可以转换成DataURL展示预览或直接上传blob
    // 下面是展示预览
    const previewUrl = URL.createObjectURL(blob);
    userPortrait.value.$refs.portraitImg.src = previewUrl;
  });
}
async function updateAvatar() {
  try {
    const token = Store.userAccount.accessToken; // 从localStorage中获取JWT令牌
    // console.log(token,1)
    const userId = Store.userAccount.userid;
    // console.log(userId)
    const response = await axiosRequest.post(
      "/profile/updateAvatar",
      { userId, image: imageFile.value },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.data.success) {
      // 显示成功的消息
      console.log(response.data);
      userStore.setUserPortrait(imageUrl.value);
      // console.log(imageUrl.value, 2);
      ElMessage.success(response.data.message);
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    ElMessage.error(error);
    console.error("Error:", error);
  } finally {
    imageUrl.value = false;
  }
}
async function getAvatar() {
  try {
    const token = Store.userAccount.accessToken; // 从localStorage中获取JWT令牌
    // console.log(token,1)
    const userId = Store.userAccount.userid;
    // console.log(userId)
    const response = await axiosRequest.get("/profile/getAvatar", {
      headers: {
        Authorization: token,
      },
      params: {
        userId,
      },
    });
    if (response.data.success) {
      // 显示成功的消息
      const userInfo = response.data;
      userPortrait.value.$refs.portraitImg.src = response.data.data;
      userStore.setUserPortrait(response.data.data);
      // console.log(userInfo, 1);
      // 个人信息设置
      ElMessage.success(response.data.message);
    } else {
      console.log(response.data);
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    // 请求失败的处理逻辑
    console.error("Error:", error);
  }
}
getAvatar();
defineExpose({ getAvatar });
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  height: 100%;

  .profile-container {
    margin: 5px;
    height: 100%;
    display: flex;
    align-items: center;

    .portrait-container {
      width: 25%;
      aspect-ratio: 1;
      border: 1px solid #333;
      border-radius: 50%;
      overflow: hidden;

      .user-portrait {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;

        :deep(.user-portrait-container) {
          padding: 0;
        }

        .user-portrait-mask {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .camera {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid #fff;
          cursor: pointer;
          padding: 5px;
          z-index: 2;

          input {
            display: none;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  .profile-info {
    position: relative;
    width: 75%;
    height: 100%;

    .crop-img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      z-index: 9;

      button {
        width: 100px;
        height: 30px;
        border-radius: 5px;
        margin: 10px;
        background-color: skyblue;
        color: #fff;
      }
    }

    .person-info {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<!-- 设置裁剪框的样式 -->
<style lang="scss">
.cropper-container .cropper-crop-box,
.cropper-container .cropper-view-box {
  border-radius: 50%;
  /* 设置圆形裁剪框 */
}

.cropper-container .cropper-view-box {
  border: 2px solid #fff;
  /* 给裁剪区域添加白色边框 */
}
</style>@/api/request