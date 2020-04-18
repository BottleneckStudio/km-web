import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// Import AWS Amplify
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

import router from './router'
import config from './aws-exports'

// import tailwindcss as our UI toolkit.
import './assets/styles/tailwind.css'

Amplify.configure(config)
Vue.use(VueRouter)
Vue.use(AmplifyPlugin, AmplifyModules)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
