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
        :src="item.image"
        alt="img of restaurant")
</template>

<script>
export default {
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
