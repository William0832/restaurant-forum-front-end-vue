<template lang="pug">
.col-3
  .card
    router-link(:to="`/users/${user.id}`")
      img.card-img-top(
        :src="emptyImage(user.image)"
        :alt="`image of ${user.name}`")
    .card-body
      h5.card-title {{user.name}}
      p.card-text
        .badge.badge-secondary 追蹤人數 {{user.followerCount}}
      button.btn.btn-primary(
        v-if="!user.isFollowed"
        @click.stop.prevent="toggleFollowed(user.id)"
      ) 追蹤
      button.btn.btn-danger(
        v-else
        @click.stop.prevent="toggleFollowed(user.id)"
      ) 取消追蹤

</template>
<script>
import { emptyImage } from '../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  mixins: [emptyImage],
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
    async toggleFollowed (userId) {
      try {
        this.user.isFollowed = !this.user.isFollowed
        const { data } = this.user.isFollowed
          ? await usersAPI.addFollowing({ userId })
          : await usersAPI.deleteFollowing({ userId })
        if (data.status !== 'success') throw new Error(data.message)
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法修改追蹤，請稍後再試'
        })
      }
    }
  }
}
</script>

<style>
</style>
