import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  nprogress.start()
  // 如果要去的地址以/home 为起始 就说明需要判断当前是不是登录 判断token
  if (to.path.startsWith('/home')) {
    let token = localStorage.getItem('username')
    console.log(token)
    if (token) {
      // 放行
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(function () {
  // 关闭进度条
  nprogress.done() // 关闭进度条
})

export default router
