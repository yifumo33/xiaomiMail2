<template>
  <div id="app" v-on:click="hide">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods:{
      hide(){
          // document.querySelector('#app').classList.remove('shade')
          // document.querySelector('.price-pannel').style.transform = "translateX(100%)"
          
        }

  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
