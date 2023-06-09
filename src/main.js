import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 这个是我们自己做的，将API挂载到vue原型身上
import API from '@/api'
Vue.prototype.$API = API;
// 关于什么环境的
import CategorySelect from '@/components/CategorySelect'
import HintButton from '@/components/HintButton'
Vue.component(CategorySelect.name,CategorySelect)
Vue.component(HintButton.name,HintButton)

// console.log('当前环境'+process.env);
// 生产环境？
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
