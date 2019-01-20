<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <MainPage msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'


export default {
  name: 'app',
  components: {
    MainPage
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd;
  height: 100%;
}
</style>
