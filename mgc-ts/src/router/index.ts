import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './route'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  to.matched.some(record => {
    if (record.meta.auth === false) {
      next()
    } else {
      const tokenType = ['', null, undefined, {}, 'null', 'undefined']
      if (tokenType.includes(store.state.token.access_token)) {
        next('/login')
      } else {
        next()
      }
    }
    return true
  })
})
export default router
