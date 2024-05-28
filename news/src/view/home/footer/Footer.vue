<template>
  <footer>
    <section class="foot-upper" v-if="showLink">
      <span class="container-title">友情链接</span>
      <ul class="friend-link">
        <li
          v-for="(item, index) in friendLink"
          :key="index"
          class="friend-link-item"
        >
          <a href="#">{{ item.title }}</a>
        </li>
      </ul>
    </section>
    <section class="foot-cont">
      <div class="pagebottom-nav">
        <ul>
          <li
            v-for="(item, index) in pageBottomLink"
            :key="index"
            class="pagebottom-nav-item"
          >
            <a href="#">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="pagebottom-nr">
        <p>
          本网站所发布的所有内容，仅代表作者个人观点，与本站立场无关。使用本网站内容，必须获得我们的书面许可。
        </p>
        <p>
          未经许可，禁止转载、摘要、复制或建立镜像等任何形式的使用，违反者将依法追究责任。
        </p>
        <div class="cutline"></div>
        <div class="des">
          <ul>
            <li
              v-for="(item, index) in pagebottomDes"
              :key="index"
              class="des-item"
            >
              <a href="#">[{{ item.title }}]</a>
            </li>
            <br />
            <li>
              违法和不良信息举报电话：15735418020
              举报邮箱：pitilessmiracle@outlook.com 客服电话：18103430741
            </li>
          </ul>
        </div>
        <div class="des">
          Copyright ©2024-2024 example.com. All Rights Reserved
        </div>
      </div>
    </section>
  </footer>
</template>

<script setup>
const props = defineProps({showLink:Boolean})
import friendLink from "../../../assets/data/friendLinks";
import pageBottomLink from "../../../assets/data/pageBottomLink.json";
import pagebottomDes from "../../../assets/data/pagebottomDes.json";
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  color: $color-text;
  background-color: $color-bg;

  .foot-upper {
    padding-left: 5%;

    .container-title {
      display: block;
      color: inherit;
      font: $text-title;
      margin-bottom: 20px;
      font-size: 1.5em;
    }

    .friend-link {
      display: flex;
      flex-wrap: wrap;

      .friend-link-item {
        margin-right: 10px;

        a {
          display: block;
          color: inherit;
          margin: 5px;
          white-space: nowrap;
          border-left: solid 2px $color-text;
          transition: all 0.5s ease;
        }

        a:hover {
          text-decoration: solid underline brown 3px;
          transform: translateY(-2px);
        }
      }
    }
  }

  .foot-cont {
    .pagebottom-nav ul {
      display: flex;
      border-top: solid 3px brown;
      justify-content: center;

      .pagebottom-nav-item {
        a {
          display: block;
          font-size: 1.25em;
          padding: 20px;
          color: inherit;
        }

        a:hover {
          background-color: $color-accent;
        }
      }
    }

    .pagebottom-nr {
      font-size: 0.9em;
      p {
        text-align: center;
        padding: 8px 0;
      }

      .cutline {
        padding-bottom: 10px;
        height: 1px;
        width: 100%;
        border-bottom: 1px dashed $color-text;
      }

      .des {
        text-align: center;
        padding: 8px 0;

        ul {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          .des-item {
            a {
              display: block;
              padding: 20px 2px;
              white-space: nowrap;
              color: inherit;
            }
          }
          .des-item:hover {
            text-decoration: solid underline brown 2px;
          }
        }
      }
    }
  }
}
</style>