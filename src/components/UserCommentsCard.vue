<template lang="pug">
.card
  .card-header
    strong {{commentedRestaurants.length}}
    | 已評論餐廳
  .card-body
    router-link(
      v-for="item in commentedRestaurants"
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
    commentedRestaurants: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>
</style>
