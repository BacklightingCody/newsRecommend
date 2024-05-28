import router from '@/router';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// Vuetify
import 'vuetify/styles'; // 引入基础样式
import { createVuetify } from 'vuetify';

// 创建 Vuetify 实例
const vuetify = createVuetify();

import App from './App.vue'
import { componentPlugin } from '@/components/index.js'
const app = createApp(App);
// 使用插件
app.use(router)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(vuetify)
app.use(componentPlugin)

// 挂载应用
app.mount('#app')