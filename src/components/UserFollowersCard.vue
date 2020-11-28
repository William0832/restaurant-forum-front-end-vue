<template lang="pug">
.card
  .card-header
    strong {{followers.length}}
    |  followers (追隨者)
  .card-body
    router-link(
      v-for="item in followers"
      :key="item.key"
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
    followers: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>
</style>
