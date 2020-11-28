<template lang="pug">
.card
  .card-header
    strong {{favoriteRestaurants.length}}
    | 收藏餐廳
  .card-body
    router-link(
      v-for="item in favoriteRestaurants"
      :key="item.id"
      :to="`/restaurants/${item.id}`"
    )
      img(
        width="60"
        height="60"
        :src="emptyImage(item.image)"
        alt="img of restaurant")
</template>

<script>
import { emptyImage } from '../utils/mixins'
export default {
  mixins: [emptyImage],
  props: {
    favoriteRestaurants: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>
</style>
