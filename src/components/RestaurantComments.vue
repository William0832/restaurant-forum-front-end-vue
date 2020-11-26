<template lang="pug">
div
  h2.my-4 所有評論：
  div
    blockquote.blockquote.mb-0(
      v-for="(comment,index ) in restaurantComments"
      :key="comment.id"
    )
      button.btn.btn-danger.float-right(
        type="button"
        v-if="currentUser.isAdmin"
        @click.stop.prevent="deleteCommentHandler(comment.id)"
      ) Delete
      h3
        router-link(to="#") {{comment.User.name}}
      p {{comment.text}}
      footer.blockquote-footer {{fromNow(comment)}}
    hr
</template>

<script>
import mixins from '../utils/mixins'
const dummyData = {
  currentUser: {
    id: 1,
    name: 'root',
    email: 'root@example.com',
    isAdmin: true
  },
  isAuthenticated: true
}
export default {
  mixins: [mixins],
  props: {
    restaurantComments: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      currentUser: dummyData.currentUser
    }
  },
  methods: {
    deleteCommentHandler (commentId) {
      // console.log('deleteCommentHandler:', commentId)
      // TODO: delete comment by API
      this.$emit('after-delete-comment', commentId)
    }
  }
}
</script>

<style>
</style>
