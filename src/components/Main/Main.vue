<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="md:flex">
        <img
          class="h-8 w-8 sm:h-8 sm:w-8 md:h-8 md:w-8 rounded-full"
          alt="Avatar"
          src="../../assets/avatar.png" />
        <div class="ml-1 mt-1">
          <p>{{ content.username }}</p>
        </div>
        <div class="ml-2 mt-1">
          <span class="text-gray-500 font-semibold"> {{ content.createdAt }} </span>
        </div>
      </div>
      <div class="mt-4">
        <Media v-bind:media="content.content"/>
      </div>
    </div>
    <div class="flex justify-center px-6 py-3">
      <Hashtag />
    </div>
    <hr />
    <div class="mt-1 p-4">

    </div>
  </div>
</template>

<script>
import Media from './Media.vue'
import Hashtag from './Hashtag.vue'

export default {
  name: 'Main',
  components: {
    Media,
    Hashtag
  },
  props: {
    content: Object
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
