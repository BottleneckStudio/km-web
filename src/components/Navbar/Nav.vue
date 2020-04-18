<template>
  <header class="km-nav bg-gray-300 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">
      <div>
        <!-- App Logo Here -->
        <router-link tag="p" to="/">
          <a class="font-semibold text-xl tracking-tight">{{ title }}</a>
        </router-link>
      </div>
      <div class="sm:hidden">
        <button @click="isOpen = !isOpen" type="button" class="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
            <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
          </svg>
        </button>
      </div>
    </div>
    <nav :class="isOpen ? 'block' : 'hidden'" class="px-2 pt-2 pb-4 sm:flex sm:p-0">
      <AccountDropdown v-if="signedIn" class="ml-6"/>
      <router-link tag="p" to="/auth" v-if="!signedIn">
        <a
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 border border-blue-300 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
          <span>Login</span>
        </a>
      </router-link>
    </nav>
  </header>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'

import AccountDropdown from './AccountDropdown'

export default {
  name: 'Nav',
  components: {
    AccountDropdown,
  },
  props: {
    title: String
  },
  data () {
    return {
      signedIn: false,
      isOpen: false,
    }
  },
  beforeCreate() {
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
        this.$router.push('/profile')
      }

      if (info === 'signedOut') {
        this.signedIn = false
        this.$router.push('/auth')
      }
    })

    Auth.currentAuthenticatedUser()
      .then(user => {
        if (user) {
          this.signedIn = true
        } else {
          this.signedIn = false
        }
      })
      .catch(() => this.signedIn = false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.km-nav{
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.1)
}

.km-nav > .km-nav__wrap{
  padding: 10px;
  margin: 0 auto;
  }

.km-search{
  width: 459px;
  height: 36px;
}

.km-search > .km-search__input{
  height: 100%;
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  background-color: rgba(0,0,0,0.1);
  color: #363635;
}

.km-nav__wrap{
  width: 1250px;
}

.km-nav__burger{
  display: none;
}

@media screen and (max-width: 1024px) {
  .km-nav__wrap{
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .km-search{
    display: none;
  }
}

@media screen and (max-width: 375px) {
  .km-nav__burger{
    display: block
  }
  .km-nav__links{
    display: none;
  }
}

</style>
