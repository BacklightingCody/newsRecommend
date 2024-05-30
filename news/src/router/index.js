import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useStore } from '@/stores/';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/view/home/HomePage.vue'),
        children: [
            {
                path: '',
                component: () => import('@/view/home/content/HomeContent.vue')
            },
            {
                path: '/article/:category/:id',
                name: 'articleDetail',
                component: () => import('@/view/article/mainContent.vue'),
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/login/LoginPage.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/view/login/SignUp.vue')
    },
    {
        path: '/personal',
        name: 'personal',
        component: () => import('@/view/profile/PersonalCenter.vue'),
        redirect: '/personal/profile',
        children: [
            { path: 'profile', component: () => import('@/view/profile/Profile.vue') },
            { path: 'security', component: () => import('@/view/profile/Security.vue') },
        ]
    },
    {
        path: '/forget',
        name: 'forget',
        component: () => import('@/view/login/ForgetPassword.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'catchAll',
        component: () => import('@/view/NotFound.vue')
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,

});

// 在路由变化开始时启动nprogress
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

// 在路由变化结束后停止nprogress
router.afterEach(() => {
    NProgress.done();
});
// 全局前置守卫
router.beforeEach((to) => {
    const Store = useStore() //必须在内部调用，否则pinia还未初始化
    // 返回 false 以取消导航
    if (!Store.userAccount.accessToken && to.path !== '/login' && to.path !== '/signup') {
        return {
            path: '/login',
            // // 保存我们所在的位置，以便以后再来
            // query: { redirect: to.fullPath },
        }
    }
    if (Store.isExpire() && to.path !== '/login' && to.path !== '/signup') {
        Store.logout()
        return {
            path: '/login',
            // // 保存我们所在的位置，以便以后再来
            // query: { redirect: to.fullPath },
        }
    }
    return true

})
// 全局后置路由检查故障
router.afterEach((to, from, failure) => {
    console.log(to.fullPath)
    if (failure) {
        console.log(failure)
        sendToAnalytics(to, from, failure)
    }

})

export default router;