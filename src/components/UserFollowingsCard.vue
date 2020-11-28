<template lang="pug">
.card
  .card-header
    strong {{followings.length}}
    |  followings (追蹤者)
  .card-body
    router-link(
      v-for="item in followings"
      :key="item.id"
      :to="`/users/${item.id}`"
    )
      img(
        width="60"
        height="60"
        :src="emptyImage(item.image)"
        alt="img of user")
</template>

<script>
import { emptyImage } from '../utils/mixins'
export default {
  mixins: [emptyImage],
  props: {
    followings: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>
</style>
