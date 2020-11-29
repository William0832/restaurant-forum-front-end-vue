<template lang="pug">
.container.py-5
  AdminNav
  router-link(
    :to="{name: 'admin-restaurant-new'}"
  ).btn.btn-primary.mb-4 New Restaurant
  AdminRestaurantsTable
</template>

<script>
import AdminNav from '../components/AdminNav'
import AdminRestaurantsTable from '../components/AdminRestaurantsTable'

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable
  }
}
</script>

<style>
</style>
