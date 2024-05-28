# 项目简介

基于 vue.js 的前端开发环境，用于前后端分离后的单页应用开发，可以在开发时使用 ES、scss 等最新语言特性。项目包含：

基础库: vue.js、vue-router、pinia、element-plus、bootstrap
编译/打包工具：vite
本地服务器：express

## 前端

### 快速开始
>
>git clone <https://github.com/BacklightingCody/newsRecommend.git>
>cd news
>npm install
>npm run dev

### 命令列表
>
>#开启本地开发服务器，监控项目文件的变化，实时构建并自动刷新浏览器，浏览器访问 <http://localhost:5173>
>npm run dev
>#使用生产环境配置构建项目，构建好的文件会输出到 "dist" 目录，
>npm run build
>
### 项目结构
>
>├── README.md                       项目介绍
>├──news
>├──db                               爬虫爬取数据存放到本地数据库mysql
>├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
>├── src                             源码目录
>│   ├── main.js                         入口js文件
>│   ├── index.html                      项目入口文件
>│   ├── vite.config.js                  vite配置文件
>│   ├── App.vue                         根组件
>│   ├── components                      公共组件目录
>│   ├── assets                          资源目录，这里的资源会被vite构建
>│       ├── imgs
>│   │   └── data                        目前存放一些静态数据
>│   ├── router                          前端路由
>│   │   └── index.js
>│   ├── store                           应用级数据（state）
>│       ├── index.js
>│       └── user.js
>│   ├── styles                          存放scss样式
>│   ├── utils                           工具函数
>│   ├── api                             存放接口函数
>│   └── views                           页面目录
>│       ├── article
>│       ├── home
>│       ├── login
>│       ├── profile
>│       └── NotFound.vue
>
## 后端

### 快速开始
>
>cd server
>npm install
>node app.js
>
### 项目结构
>
>├──server
>├──db                               爬虫爬取数据存放到本地数据库mysql
>├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
>├── app.js                          项目入口文件
>├── database                        存放连接数据库文件
>├── routes                          存放路由
>├── handle_routes                   路由中需要调用的一些函数
>├── middleware                      存放中间件函数
>├── utils                           存放工具函数
>├── api                             接口函数和工具函数
