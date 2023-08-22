import {createRouter, createWebHistory} from 'vue-router'

const routerHistory = createWebHistory()
import FormTest from './views/form_test/index.vue'
import SelectTest from './views/select_test/index.vue'
import RadioTest from './views/radio_test/index.vue'

import HelloWorld from './components/HelloWorld.vue'
// 定义路由
const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/select',
        name: 'select',
        component: SelectTest
    },
    {
        path: '/form',
        name: 'form',
        component: FormTest
    },
    {
        path: '/radio',
        name: 'radio',
        component: RadioTest
    },
]

// 创建路由器
const router = createRouter({
    history: routerHistory,
    routes: routes
})


export default router;
