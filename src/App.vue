<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted:function(){
    this.$router.push({
      path:"/login"
    })
  }
}
</script>

<style>
#nprogress .bar {
  background: #fff;
}
</style>
