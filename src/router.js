import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'
import Test from './views/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      children: [{
        path: '', // 默认二级路由的地址path为空
        component: Main
      }, {
        // 评论列表
        path: 'comment',
        component: () => import('./views/comment')
      }, {
        // 发布文章
        path: 'publish',
        component: () => import('./views/publish')
      },
      {
        // 修改文章
        path: 'publish/:articleId',
        component: () => import('./views/publish')
      },
      {
        // 素材管理
        path: 'material',
        component: () => import('./views/material')
      }, {
        // 内容管理
        path: 'articles',
        component: () => import('./views/articles')
      }, {
        // 账号信息
        path: 'account',
        component: () => import('./views/account')
      }]
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      // 登录
      path: '/login',
      component: Login
    },
    {
      path: '/test',
      component: Test
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
