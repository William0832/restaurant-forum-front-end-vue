<template lang="pug">
div
  h2.my-4 所有評論：
  div
    blockquote.blockquote.mb-0(
      v-for="(comment, index) in restaurantComments",
      :key="comment.id"
    )
      button.btn.btn-danger.float-right(
        type="button",
        v-if="currentUser.isAdmin",
        @click.stop.prevent="deleteCommentHandler(comment.id)"
      ) Delete
      h3
        router-link(to="#") {{ comment.User.name }}
      p {{ comment.text }}
      footer.blockquote-footer {{ fromNow(comment) }}
    hr
</template>

<script>
import { fromNow } from '../utils/mixins'
import { mapState } from 'vuex'
import restaurantAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  mixins: [fromNow],
  props: {
    restaurantComments: {
      type: Array,
      require: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async deleteCommentHandler (commentId) {
      try {
        const { data } = await restaurantAPI.comments.delete(commentId)
        if (data.status === 'error') throw new Error(data.message)
        const comments = this.restaurantComments.filter(e => e.id !== commentId)
        this.$emit('update:restaurantComments', comments)
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法刪除評論，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
h2.my-4
  margin-bottom: 1rem !important
  font-size: 18px

h3
  margin-bottom: 3px
  line-height: 1.3

.blockquote-footer
  font-size: 12.5px
</style>
