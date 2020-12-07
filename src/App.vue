<template lang="pug">
#restaurant-forum
  Navbar
  main.mt-5(role="main")
    router-view
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import './assets/application.css'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="sass" scoped>
main
  margin-top: 65px !important
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
#nav
  padding: 30px

  a
    margin: 0.5rem
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983
</style>
