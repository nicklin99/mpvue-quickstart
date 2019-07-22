<template>
  <web-view :src="src"></web-view>
</template>

<script>
export default {
  data () {
    return {
      src: ''
    }
  },
  methods: {},
  onLoad ({url, src}) {
    this.onload(null, null, () => {
      this.src = decodeURIComponent(url || src)
      console.log(`h5.load ${this.src}`)
    })
  },
  onUnload () {
    this.src = ''
  }
}
</script>

<style>
</style>
