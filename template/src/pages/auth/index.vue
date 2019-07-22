<template>
  <div class="root">
    <div class="wrapper">
      <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">确认授权</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getUserInfo (data) {
      const {mp} = data
      // 授权拒绝
      if (!mp.detail.userInfo) {
        return this.$toast('请完成授权')
      }
      this.$loading(true, '正在授权')
      this.$store.dispatch('loginApp', mp.detail).then(() => {
        const backPath = this.$router.current.from.path
        const queryParams = this.$router.current.from.query
        const query = []
        for (let obj in queryParams) {
          query.push(`${obj}=${queryParams[obj]}`)
        }
        console.log('login.success.then', this.$router.current.from)
        const method =
          this.$router.current.from.type === 'tab' ? 'tab' : 'replace'
        this.$router[method](
          `${backPath}${
            query.length > 0 ? '?' + query.join('&') : ''
          }`,
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
        this.$loading(false)
      }).catch(() => {
        this.$loading(false)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

