<template lang="pug">
.card
  .card-header 最新餐廳
  .card-body
    div(v-for="(item,index) in restaurants")
      h4
        router-link(:to="`/restaurants/${item.id}`") {{ item.name }}
        small {{ item.Category.name }}
      p {{ item.description }}
      p {{ fromNow(item)}}
      hr
</template>
<script>
import { fromNow } from '../utils/mixins'
export default {
  mixins: [fromNow],
  props: {
    restaurants: {
      type: Array,
      require: true
    }
  }
}
</script>

<style scoped lang="sass">
small
  font-size: 10px
</style>
