<template lang="pug">
.row
  .col-md-12.mb-3
    h1 {{restaurant.name}}
    p.badge.badge-secondary.mt-1.mb-3 {{restaurant.categoryName}}
  .col-lg-4
    img(
      :src="emptyImage(restaurant.image)"
      :alt="`image of ${restaurant.name}`"
    )
    .contact-info-wrap
      ul.list-unstyled
        li
          strong Opening Hour:
          | {{restaurant.openingHours}}
        li
          strong Tel:
          | {{restaurant.tel}}
        li
          strong Address:
          |{{restaurant.address}}
  .col-lg-8
    p {{ restaurant.description }}
    router-link.btn.btn-primary.btn-border.mr-2(:to="`/restaurants/${restaurant.id}/dashboard`") Dashboard
    button.btn.btn-danger.btn-border.mr-2(
      type="button"
      v-if="restaurant.isFavorited"
      @click.stop.prevent ="toggleFavorite"
    ) 移除最愛
    button.btn.btn-primary.btn-border.mr-2(
      type="button"
      v-else
      @click.stop.prevent ="toggleFavorite"
    ) 加到最愛
    button.btn.btn-danger.like.mr-2(
      type="button"
      v-if="restaurant.isLiked"
      @click.stop.prevent ="toggleLik"
    ) Unlike
    button.btn.btn-primary.like.mr-2(
      type="button"
      v-else
      @click.stop.prevent ="toggleLik"
    ) Like
</template>

<script>
import { emptyImage } from '../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
export default {
  mixins: [emptyImage],
  props: {
    initialRestaurant: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      restaurant: this.initialRestaurant
    }
  },
  watch: {
    initialRestaurant (nv) {
      console.log('isFavorited:', nv.isFavorited)
      this.restaurant = {
        ...this.restaurant,
        ...nv
      }
    }
  },
  methods: {
    async toggleFavorite () {
      try {
        const restaurantId = this.restaurant.id
        // call API
        const { data } = this.restaurant.isFavorited
          ? await usersAPI.deleteFavorite({ restaurantId })
          : await usersAPI.addFavorite({ restaurantId })
        if (data.status === 'error') throw new Error(data.message)
        // 畫面更新
        this.restaurant.isFavorited = !this.restaurant.isFavorited
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新我的最最愛，請稍後再試'
        })
      }
    },
    async toggleLik () {
      try {
        const restaurantId = this.restaurant.id
        // call API
        const { data } = this.restaurant.isLiked
          ? await usersAPI.deleteLike({ restaurantId })
          : await usersAPI.addLike({ restaurantId })
        if (data.status === 'error') throw new Error(data.message)
        // 畫面更新
        this.restaurant.isLiked = !this.restaurant.isLiked
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新 Like，請稍後再試'
        })
      }
    }
  }
}
</script>

<style>
</style>
