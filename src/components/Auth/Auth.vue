<template>
  <div class="flex flex-col items-center justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
    <sign-in v-if="formState === 'signIn'"></sign-in>
    <sign-up :toggle="toggle" v-if="formState === 'signUp'"></sign-up>

    <div class="text-center pt-12 pb-12">
      <p>
        {{ formState === 'signUp' ? 'Already have an account? ' : 'Don\'t have an account? ' }}
        <a
          href="#"
          class="underline font-semibold"
          @click="toggle">
          {{ formState === 'signUp' ? 'Login' : 'Sign Up' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
// import { AmplifyEventBus } from 'aws-amplify-vue'
import SignUp from './Signup'
import SignIn from './Signin'

export default {
  name: 'app',
  data() {
    return {
      formState: 'signIn'
    }
  },
  methods: {
    toggle() {
      this.formState === 'signUp' ? this.formState = 'signIn' : this.formState = 'signUp'
    }
  },
  components: {
    SignUp,
    SignIn
  }
}
</script>

<style>
</style>
