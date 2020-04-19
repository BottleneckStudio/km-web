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
      passwordStateClass: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
      passwordInvalidClass: 'shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
    }
  },
  methods: {
    async login() {
      const { username, password } = this.form
      try {
        await Auth.signIn(username, password)
        AmplifyEventBus.$emit('authState', 'signedIn')
        this.$router.push('/profile')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
