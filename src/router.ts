import {createRouter, createWebHistory} from 'vue-router'

const routerHistory = createWebHistory()

import HelloWorld from './components/HelloWorld.vue'
// 定义路由
const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }
]

// 创建路由器
const router = createRouter({
    history: routerHistory,
    routes: routes
})


export default router;
