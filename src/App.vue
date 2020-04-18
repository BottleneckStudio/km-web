<template>
  <div id="app" >
    <Nav title="keepmotivat.in"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'

import Nav from './components/Navbar/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav,
  },
  data() {
    return {
      signedIn: false
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
    });
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

<style>
.nav {
  display: flex;
}
.nav p {
  padding: 0px 30px 0px 0px;
  font-size: 18px;
  color: #000;
}
.nav p:hover {
  opacity: .7;
}
.nav p a {
  text-decoration: none;
}
.sign-out {
  width: 160px;
  margin: 0 auto;
}
</style>
