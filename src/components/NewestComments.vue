<template lang="pug">
.card
  .card-header 最新評論
  .card-body
    div(
      v-for="(item, index) in existedComment"
      :key= "item.id"
    )
      h4
        router-link(:to="`/restaurants/${item.Restaurant.id}`") {{item.Restaurant.name}}
      p {{item.text}}
      | by
      router-link(to="#") {{item.User.name}}
      | at {{fromNow(item)}}
      hr
</template>

<script>
import mixins from '../utils/mixins'
export default {
  mixins: [mixins],
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
