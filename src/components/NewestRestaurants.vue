<template lang="pug">
.card
  .card-header 最新餐廳
  .card-body
    div(v-for="(item, index) in restaurants", :key="item.id")
      h4
        router-link.mr-1(:to="`/restaurants/${item.id}`") {{ item.name }}
        small.badge.badge-secondary(v-if="item.Category") {{ item.Category.name }}
        small.badge.badge-secondary(v-else) 未分類
      p {{ item.description }}
      p {{ fromNow(item) }}
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
  },
  watch: {
    restaurants (nv) {
      nv.forEach(e => console.log(e.name))
    }
  }
}
</script>

<style scoped lang="sass">
small
  font-size: 10px
</style>
