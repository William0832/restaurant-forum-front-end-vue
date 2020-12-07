<template lang="pug">
table.table
  thead.thead-dark
    tr
      th(scope="col") #
      th(scope="col") Category
      th(scope="col") Name
      th(scope="col", width="300") Actions
  tbody
    tr(v-for="restaurant in restaurants", :key="restaurant.id")
      th(scope="row") {{ restaurant.id }}
      td {{ restaurant.Category ? restaurant.Category.name : '未分類' }}
      td {{ restaurant.name }}
      td.d-flex.justify-content-between
        router-link.btn.btn-link(
          :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
        ) Show
        router-link.btn.btn-link(
          :to="`/admin/restaurants/${restaurant.id}/edit`"
        ) Edit
        button.btn.btn-link(
          type="button",
          @click.stop.prevent="deleteRestaurant(restaurant.id)"
        ) Delete
</template>

<script>
import { Toast } from '../utils/helpers'
import adminAPI from '../apis/admin'
export default {
  data () {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  watch: {
    isLoading (nv) {
      this.$emit('loading', nv)
    }
  },
  methods: {
    async fetchRestaurants () {
      try {
        const { data } = await adminAPI.restaurants.get()
        this.restaurants = data.restaurants
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資列表，清稍後再試'
        })
      }
    },
    async deleteRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.delete({ restaurantId })
        if (data.status !== 'success') throw new Error(data.message)
        this.restaurants = this.restaurants.filter(e => e.id !== restaurantId)
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchRestaurants()
  }
}
</script>

<style>
</style>
