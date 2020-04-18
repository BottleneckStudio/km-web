<template>
  <div>
    <p class="text-center text-3xl">
      Sign Up
    </p>

    <form
      v-if="formState === 'signUp'"
      v-on:submit.prevent="signup"
      class="flex flex-col pt-3 md:pt-8">

      <div class="flex flex-col pt-4">
        <label for="email" class="text-lg">
          Email Address
        </label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="your@email.com"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div class="flex flex-col pt-4">
        <label for="username" class="text-lg">
          Username
        </label>
        <input
          v-model="form.username"
          type="text"
          id="username"
          placeholder="Username"
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
          placeholder="Password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div class="flex flex-col pt-4">
        <label for="confirm_password" class="text-lg">
          Confirm Password
        </label>
        <input
          v-model="form.confirm_password"
          type="password"
          id="confirm_password"
          placeholder="Password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <button
        type="submit"
        class="bg-green-500 text-white font-bold text-lg hover:bg-green-700 p-2 mt-8">
          Sign Up
      </button>
    </form>

    <div v-if="formState === 'confirmSignUp'">
      <h1> Please Check Your Email </h1>
    </div>
    <!-- <form -->
    <!--   v&#45;on:submit.prevent="confirmSignUp" -->
    <!--   v&#45;if="formState === 'confirmSignUp'"> -->
    <!--   <input -->
    <!--     v&#45;model="authCode" -->
    <!--     type="text" -->
    <!--     id="authCode" -->
    <!--     placeholder="Confirmation Code" -->
    <!--     class="shadow appearance&#45;none border rounded w&#45;full py&#45;2 px&#45;3 text&#45;gray&#45;700 mt&#45;1 leading&#45;tight focus:outline&#45;none focus:shadow&#45;outline"> -->
    <!--  -->
    <!--   <button -->
    <!--     type="submit" -->
    <!--     class="bg&#45;blue&#45;500 text&#45;white font&#45;bold text&#45;lg hover:bg&#45;green&#45;700 p&#45;2 mt&#45;8"> -->
    <!--       Confirm -->
    <!--   </button> -->
    <!-- </form> -->
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  name: 'home',
  props: ['toggle'],
  data() {
    return {
      formState: 'signUp',
      authCode: '',
      form: {
        username: '',
        password: '',
        email: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    async signup() {
      const { username, password, email } = this.form
      await Auth.signUp({
        username, password, attributes: { email }
      })
      this.formState = 'confirmSignUp'
    },
    async confirmSignUp() {
      const username = this.form.username
      const authCode = this.authCode
      await Auth.confirmSignUp(username, authCode)
      this.toggle()
    }
  }
}
</script>

<style>
</style>
