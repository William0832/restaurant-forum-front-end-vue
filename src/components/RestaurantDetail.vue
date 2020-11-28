<template lang="pug">
.row
  .col-md-12.mb-3
    h1 {{restaurant.name}}
    p.badge.badge-secondary.mt-1.mb-3 {{restaurant.categoryName}}
  .col-lg-4
    img(
      :src="restaurant.image"
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
export default {
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
  methods: {
    toggleFavorite () {
      this.restaurant.isFavorited = !this.restaurant.isFavorited
    },
    toggleLik () {
      this.restaurant.isLiked = !this.restaurant.isLiked
    }
  }
}
</script>

<style>
</style>
