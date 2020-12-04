<template lang="pug">
.card.mb-3
  .row.no-gutters
    .col-md-4
      img(
        width="300"
        height="300"
        :src="emptyImage(profile.image)"
        alt="img")
    .col-md-8
      .card-body
        h5.card-title {{profile.name}}
        p.card-text {{profile.email}}
        ul.list-unstyled.list-inline
          li
            strong {{commentedRestaurants.length}}
            |  已評論餐廳
          li
            strong {{profile.FavoritedRestaurants.length}}
            |  收藏的餐廳
          li
            strong {{profile.Followings.length}}
            |  followings (追蹤者)
          li
            strong {{profile.Followers.length}}
            |  followers (追隨者)
        router-link.btn.btn-info(
          type="button"
          v-if="currentUser.id === profile.id"
          :to="`/users/${profile.id}/edit`"
        ) edit
        .btns(v-else)
          button.btn.btn-danger(
            v-if="isFollower"
            @click="toggleFollowing"
            :disabled="isProcessing"
            type="button") 取消追蹤
          button.btn.btn-primary(
            v-else
            :disabled="isProcessing"
            @click="toggleFollowing"
            type="button") 追蹤
</template>

<script>
import { emptyImage } from '../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
export default {
  mixins: [emptyImage],
  props: {
    initProfile: {
      type: Object,
      require: true
    },
    currentUser: {
      type: Object,
      require: true
    },
    commentedRestaurants: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isProcessing: false,
      profile: this.initProfile
    }
  },
  watch: {
    initProfile (nv) {
      this.profile = nv
    }
  },
  computed: {
    isFollower () {
      return this.profile.Followers.map(e => e.id).includes(this.currentUser.id)
    }
  },
  methods: {
    async toggleFollowing () {
      try {
        this.isProcessing = true
        const userId = this.profile.id
        let res
        if (this.isFollower) {
          res = await usersAPI.deleteFollowing({ userId })
          this.profile.Followers = this.profile.Followers.filter(e => e.id !== this.currentUser.id)
        } else {
          res = await usersAPI.addFollowing({ userId })
          this.profile.Followers.push({ id: this.currentUser.id })
        }
        this.isProcessing = false
        const { data } = res
        if (data.status === 'error') throw new Error('data.msg')
      } catch (err) {
        console.error(err)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新追蹤，請稍後再試'
        })
      }
    }
  }

}
</script>
