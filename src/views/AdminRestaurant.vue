<template lang="pug">
.container.py-5
  .row
    .col-md-12
      h1 {{ restaurant.name }}
      span.badge.badge-secondary.mt-1.mb-3 {{ restaurant.categoryName}}
    .col-md-4
      img.img-responsive.center-block(
        :src="emptyImage(restaurant.image)"
        style="width: 250px; margin-bottom: 25px")
      .well
        ul.list-unstyled
          li
            strong Opening Hour:
            | {{ restaurant.openingHours }}
          li
            strong Tel:
            | {{ restaurant.tel }}

          li
            strong Address:
            | {{ restaurant.address }}
    .col-md-8
      p {{ restaurant.description }}
  hr
  button.btn.btn-link(
    type="button"
    @click="$router.back()"
  )  回上一頁

</template>
<script>
import { emptyImage } from './../utils/mixins'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
export default {
  mixins: [emptyImage],
  data () {
    return {
      restaurant: {
        id: '',
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: ''
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    console.log(id)
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })
        const { name, id, Category, opening_hours: openingHours, image, tel, address, description } = data.restaurant
        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          image,
          openingHours,
          tel,
          address,
          description
        }
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取的餐廳資料，請稍後再試'
        })
      }
    }
  },
  mounted () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  }
}
</script>
