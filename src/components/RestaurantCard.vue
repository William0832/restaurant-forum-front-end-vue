<template lang="pug">
.col-md-6.col-lg-4
  .card.mb-4
    router-link(:to="{ name: 'restaurant', params: { id: restaurant.id } }")
      img.card-img-top(
        :src="emptyImage(restaurant.image)",
        alt="image of restaurant"
      )
    .card-body
      p.card-title {{ restaurant.name }}
      span.badge.badge-secondary {{ restaurant.Category.name }}
      p.card-text.text-truncate {{ restaurant.description }}
    .card-footer
      button.btn.btn-danger.btn-border.favorite.mr-2(
        type="button",
        v-if="restaurant.isFavorited",
        :disabled="isProcessing",
        @click.stop.prevent="toggleFavorite(restaurant.id)"
      ) 移除最愛
      button.btn.btn-primary.btn-border.favorite.mr-2(
        type="button",
        v-else,
        :disabled="isProcessing",
        @click.stop.prevent="toggleFavorite(restaurant.id)"
      ) 加入最愛
      button.btn.btn-danger.btn-border.like.mr-2(
        type="button",
        v-if="restaurant.isLiked",
        :disabled="isProcessing",
        @click.stop.prevent="toggleLike(restaurant.id)"
      ) Unlike
      button.btn.btn-primary.btn-border.like.mr-2(
        type="button",
        v-else,
        :disabled="isProcessing",
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
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false
    }
  },
  methods: {
    async toggleFavorite (restaurantId) {
      try {
        this.isProcessing = true
        this.restaurant.isFavorited = !this.restaurant.isFavorited
        const { data } = this.restaurant.isFavorited
          ? await usersAPI.addFavorite({ restaurantId })
          : await usersAPI.deleteFavorite({ restaurantId })
        if (data.status !== 'success') throw new Error(data.message)
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法改變我的最愛，請稍後再試'
        })
      }
    },
    async toggleLike (restaurantId) {
      try {
        this.isProcessing = true
        this.restaurant.isLiked = !this.restaurant.isLiked
        const { data } = this.restaurant.isLiked
          ? await usersAPI.addLike({ restaurantId })
          : await usersAPI.deleteLike({ restaurantId })
        if (data.status !== 'success') throw new Error(data.message)
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
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

<style lang="sass" scoped>
.badge.badge-secondary
  padding: 0
  margin: 8px 0
  color: #bd2333
  background-color: transparent

.btn, .btn-border.btn:hover
  margin: 7px 14px 7px 0

.card
  margin-bottom: 2rem !important

  &-img-top
    background-color: #EFEFEF

  &-body
    padding: 17.5px

  &-footer
    padding: 9px 17.5px
    border-color: rgb(232, 232, 232)
    background: whi
</style>
