<template>
  <div>
    <button @click="getRequest">点击发送ping请求</button>
    <textarea id="" cols="30" rows="10">\{{result}}</textarea>
  </div>
</template>

<script>
export default {
  data () {
    return {
      result: ''
    }
  },
  methods: {
    getRequest () {
      this.$store.dispatch('ping').then(res => {
        console.log('ping.res', res)
        this.result = res
      }).catch(e => {
        console.log('ping.error', e)
      })
    }
  }
}
</script>