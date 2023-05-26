<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <!-- <LogAnalytics /> -->
  <!-- <LogQuery /> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import LogAnalytics from './components/LogAnalytics.vue';
// import LogQuery from './components/LogQuery.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    // LogAnalytics,
    // LogQuery,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
