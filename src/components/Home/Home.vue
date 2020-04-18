<template>
  <div id="app" class="min-h-screen flex flex-col">
    <div
      class="flex flex-grow p-4 justify-center"
      v-for="media in medias"
      v-bind:key="media.id">
      <Main v-bind:content="media"/>
    </div>
  </div>
</template>

<script>
import Main from '../Main/Main.vue'
import media from '../../api/media.json'

export default {
  name: 'App',
  components: {
    Main
  },
  data: function () {
    return {
      medias: []
    }
  },
  methods: {
    getMedias: function () {
      this.medias = media.medias
    }
  },
  created: function () {
    this.getMedias()
  }
}
</script>

<style>
</style>
