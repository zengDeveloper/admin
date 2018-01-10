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
      path:"/"
    })
  }
}
</script>

<style>
#nprogress .bar {
  background: #fff;
}
</style>
