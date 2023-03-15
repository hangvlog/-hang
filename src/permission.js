// 权限控制
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

// 全局前置导航首位
router.beforeEach(async(to, from, next) => {
  // 开始加载
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      //不去/login路由
      const hasGetUserInfo = store.getters.name
      // 有用户信息就直接放行
      if (hasGetUserInfo) {
        next()
      } else {
        // 没有用户信息 尝试拿到用户信息
        try {
          // get user info
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // 没有拿到用户信息 token过期 
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 全局后置导航首位
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
