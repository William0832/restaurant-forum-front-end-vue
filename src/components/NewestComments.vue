<template lang="pug">
.card
  .card-header 最新評論
  .card-body
    div(v-for="(item, index) in existedComment", :key="item.id")
      h4
        router-link(:to="`/restaurants/${item.Restaurant.id}`") {{ item.Restaurant.name }}
      p {{ item.text }}
      | by
      router-link(to="#") {{ item.User.name }}
      | at {{ fromNow(item) }}
      hr
</template>

<script>
import { fromNow } from '../utils/mixins'
export default {
  mixins: [fromNow],
  props: {
    comments: {
      type: Array,
      require: true
    }
  },
  computed: {
    existedComment () {
      return this.comments.filter(e => e.Restaurant && e.text)
    }
  }
}
</script>

<style scoped lang="sass">
h2.my-4
  margin-bottom: 1rem !important
  font-size: 18px

h3
  margin-bottom: 3px
  line-height: 1.3

.blockquote-footer
  font-size: 12.5px
</style>
