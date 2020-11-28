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
        @click.stop.prevent="toggleFavorite"

      ) 移除最愛
      button.btn.btn-primary.btn-border.favorite.mr-2(
        type="button"
        v-else
        @click.stop.prevent="toggleFavorite"
      ) 加入最愛
      button.btn.btn-danger.btn-border.like.mr-2(
        type="button"
        v-if="restaurant.isLiked"
        @click.stop.prevent="toggleLike"
      ) Unlike
      button.btn.btn-primary.btn-border.like.mr-2(
        type="button"
        v-else
        @click.stop.prevent="toggleLike"
      ) Like
</template>

<script>
import { emptyImage } from '../utils/mixins'
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
    toggleFavorite () {
      this.restaurant.isFavorited = !this.restaurant.isFavorited
    },
    toggleLike () {
      this.restaurant.isLiked = !this.restaurant.isLiked
    }
  }
}
</script>

<style lang="sass">
</style>
