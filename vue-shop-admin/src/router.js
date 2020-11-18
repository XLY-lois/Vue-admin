import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import Welcome from './components/Welcome'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        }
      ]
    }
  ]
})

//挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   //获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login') //token不存在 即没有登录
//   next() //token存在
// })
export default router
