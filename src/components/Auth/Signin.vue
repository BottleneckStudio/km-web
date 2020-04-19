<template>
  <div>
    <p class="text-center text-3xl">
      Login
    </p>
    <form
      class="font-normal flex flex-col pt-3 md:pt-8"
      v-on:submit.prevent="login">

      <div class="flex flex-col pt-4">
        <label for="username" class="text-lg">
          Username
        </label>
        <input
          v-model="form.username"
          type="text"
          id="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div class="flex flex-col pt-4">
        <label for="password" class="text-lg">
          Password
        </label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          placeholder="*****"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div
        v-if="invalidForm"
        class="mt-4 px-2 py-2 text-center">
        <p class="font-normal text-red-500">{{ errorMsg }}</p>
      </div>

      <button
        type="submit"
        class="bg-green-500 bg-transparent text-white font-bold text-lg hover:bg-green-700 p-2 mt-8">
          Login
      </button>
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'home',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      passwordEmpty: false,
      errorMsg: '',
      invalidForm: false,
    }
  },
  methods: {
    async login() {
      try {
        const { username, password } = this.form
        await Auth.signIn(username, password)
        AmplifyEventBus.$emit('authState', 'signedIn')
        this.$router.push('/profile')
      } catch (e) {
        this.invalidForm = true
        this.errorMsg = e.message
      }
    }
  }
}
</script>
