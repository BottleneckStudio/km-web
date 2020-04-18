<template>
  <div>
    <img
      class="rounded"
      :src="media" />
  </div>
</template>

<script>
export default {
  name: 'Media',
  props: {
    media: String
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
