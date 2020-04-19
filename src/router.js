import VueRouter from 'vue-router'
import Vue from 'vue'

const routes = [
    {
      path: '/',
      component: () => import('./components/Home/Home.vue')
    },
    {
      path: '/auth',
      component: () => import ('./components/Auth/Auth.vue')
    },
    {
      path: '/protected',
      component: () => import('./components/Protected/Protected.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      component: () => import('./components/Profile/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    }
]

const router = new VueRouter({
    routes
})

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
      if (data && data.signInUserSession) {
        user = data
        window.localStorage.setItem('token', user.signInUserSession.accessToken.jwtToken)
      }
      return next()
    }).catch((e) => {
      if (e) {
        return next({
          path: '/auth'
        })
      }
      return next({
        path: '/auth'
      })
    })
  }
  next()
})

export default router
