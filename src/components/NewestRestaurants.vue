<template lang="pug">
.card
  .card-header 最新餐廳
  .card-body
    div(v-for="(item,index) in restaurants")
      h4
        router-link(to="#") {{ item.name }}
        small {{ item.Category.name }}
      p {{ item.description }}
      p {{ fromNows[index]}}
      hr
</template>
<script>
import moment from 'moment'
export default {
  props: {
    restaurants: {
      type: Array,
      require: true
    }
  },
  computed: {
    fromNows () {
      return this.restaurants.map(e => moment(e.createdAt).fromNow())
    }
  }
}
</script>

<style scoped lang="sass">
small
  font-size: 10px
</style>
