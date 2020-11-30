<template lang="pug">
.container.py-5(v-if="!isLoading")
  div
    h1 {{ restaurant.name }}
    .badge.badge-secondary.mt-1.mb-3 {{ restaurant.Category.name }}
  hr
  ul
    li 評論數： {{ restaurant.Comments.length }}
    li 瀏覽次數： {{ restaurant.viewCounts }}
  button.btn.btn-link(
    type="button"
    @click="$router.back()"
  ) 回上一頁
</template>

<script>
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'
export default {
  data () {
    return {
      isLoading: true,
      restaurant: {}
    }
  },
  methods: {
    async fetchRestaurant () {
      try {
        const { id } = this.$route.params
        const { data } = await restaurantsAPI.getDashboard({ restaurantId: id })
        this.restaurant = {
          ...data.restaurant
        }
        this.isLoading = false
        console.log(data)
        if (data.status === 'error') throw new Error(data.message)
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchRestaurant()
  }
}
</script>
