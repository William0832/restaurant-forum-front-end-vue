<template lang="pug">
.col-md-6.col-lg-4
  .card.mb-4
    router-link(
      :to="{ name:'restaurant',params:{id: restaurant.id} }"
    )
      img.card-img-top(
        :src="emptyImage(restaurant.image)"
        alt="image of restaurant"
      )
    .card-body
      p.card-title {{restaurant.name}}
      span.badge.badge-secondary {{restaurant.Category.name}}
      p.card-text.text-truncate {{restaurant.description}}
    .card-footer
      button.btn.btn-danger.btn-border.favorite.mr-2(
        type="button"
        v-if="restaurant.isFavorited"
        @click.stop.prevent="toggleFavorite(restaurant.id)"

      ) 移除最愛
      button.btn.btn-primary.btn-border.favorite.mr-2(
        type="button"
        v-else
        @click.stop.prevent="toggleFavorite(restaurant.id)"
      ) 加入最愛
      button.btn.btn-danger.btn-border.like.mr-2(
        type="button"
        v-if="restaurant.isLiked"
        @click.stop.prevent="toggleLike(restaurant.id)"
      ) Unlike
      button.btn.btn-primary.btn-border.like.mr-2(
        type="button"
        v-else
        @click.stop.prevent="toggleLike(restaurant.id)"
      ) Like
</template>

<script>
import { emptyImage } from '../utils/mixins'
import { Toast } from '../utils/helpers'
import usersAPI from '../apis/users'
export default {
  mixins: [emptyImage],
  props: {
    initialRestaurant: {
      type: Object,
      require: true
    }
  },
  data () {
    return { restaurant: this.initialRestaurant }
  },
  methods: {
    async toggleFavorite (restaurantId) {
      try {
        this.restaurant.isFavorited = !this.restaurant.isFavorited
        const { data } = this.restaurant.isFavorited
          ? await usersAPI.addFavorite({ restaurantId })
          : await usersAPI.deleteFavorite({ restaurantId })
        if (data.status !== 'success') throw new Error(data.message)
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法改變我的最愛，請稍後再試'
        })
      }
    },
    async toggleLike (restaurantId) {
      try {
        this.restaurant.isLiked = !this.restaurant.isLiked
        const { data } = this.restaurant.isLiked
          ? await usersAPI.addLike({ restaurantId })
          : await usersAPI.deleteLike({ restaurantId })
        if (data.status !== 'success') throw new Error(data.message)
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法修改Like，請收後再試'
        })
      }
    }
  }
}
</script>

<style lang="sass">
</style>
