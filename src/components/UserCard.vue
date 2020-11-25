<template lang="pug">
.col-3
  .card
    router-link(to="#")
      img.card-img-top(
        :src="user.image"
        :alt="`image of ${user.name}`")
    .card-body
      h5.card-title {{user.name}}
      p.card-text
        .badge.badge-secondary 追蹤人數 {{user.FollowerCount}}
      button.btn.btn-primary(
        v-if="!user.isFollowed"
        @click.stop.prevent="toggleFollowed"
      ) 追蹤
      button.btn.btn-danger(
        v-else
        @click.stop.prevent="toggleFollowed"
      ) 取消追蹤

</template>
<script>
export default {
  props: {
    initialUser: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      user: this.initialUser
    }
  },
  methods: {
    toggleFollowed () {
      this.user.isFollowed = !this.user.isFollowed
    }
  }
}
</script>

<style>
</style>
