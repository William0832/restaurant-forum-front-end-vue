<template lang="pug">
.container.py-5
  AdminNav
  Spinner(v-show="isLoading")
  div(v-show="!isLoading")
    router-link.btn.btn-primary.mb-4(:to="{ name: 'admin-restaurant-new' }") New Restaurant
    AdminRestaurantsTable(@loading="isLoadingHandler")
</template>

<script>
import AdminNav from '../components/AdminNav'
import AdminRestaurantsTable from '../components/AdminRestaurantsTable'
import Spinner from '../components/Spinner'
export default {
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    isLoadingHandler (value) {
      this.isLoading = value
    }
  },
  components: {
    AdminNav,
    AdminRestaurantsTable,
    Spinner
  }
}
</script>

<style>
</style>
