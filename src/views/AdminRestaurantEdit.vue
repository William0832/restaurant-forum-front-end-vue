<template lang="pug">
.container.py-5
  Spinner(v-if="isLoading")

  AdminRestaurantForm(
    v-else,
    @after-submit="afterSubmitHandler",
    :initial-restaurant="restaurant",
    :is-processing="isProcessing"
  )
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
import Spinner from '../components/Spinner'
export default {
  components: {
    AdminRestaurantForm, Spinner
  },
  data () {
    return {
      isProcessing: false,
      isLoading: true,
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })
        const { restaurant } = data
        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryId: restaurant.CategoryId,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description,
          image: restaurant.image,
          openingHours: restaurant.opening_hours
        }
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐聽資料，請稍後再試'
        })
      }
    },
    async afterSubmitHandler (formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({ restaurantId: this.restaurant.id, formData })
        if (data.status !== 'success') throw new Error(data.message)
        this.$router.push({ name: 'admin-restaurants' })
      } catch (err) {
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          titles: '無法更新餐廳資料，請稍後再試'
        })
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  }
}
</script>
