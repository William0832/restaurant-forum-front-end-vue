<template lang="pug">
.container.py-5(v-if="profile")
  UserProfileCard(
    :init-profile="profile"
    :currentUser="currentUser"
    :commentedRestaurants="commentedRestaurants"
    )
  .row
    .col-md-4
      UserFollowingsCard(:followings="profile.Followings")
      br
      UserFollowersCard(:followers="profile.Followers")
    .col-md-8
      UserCommentsCard(:commentedRestaurants="commentedRestaurants")
      UserFavoritedRestaurantsCard(:favoriteRestaurants="profile.FavoritedRestaurants")
</template>

<script>
import UserProfileCard from '../components/UserProfileCard.vue'
import UserFollowingsCard from '../components/UserFollowingsCard.vue'
import UserFollowersCard from '../components/UserFollowersCard.vue'
import UserCommentsCard from '../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from '../components/UserFavoritedRestaurantsCard.vue'
import { mapState } from 'vuex'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  data () {
    return {
      profile: undefined,
      isFollowed: undefined
    }
  },
  methods: {
    async fetchUser (id) {
      try {
        const { data, statusText } = await usersAPI.get({ userId: id })
        if (statusText !== 'OK') throw new Error(data.msg)
        this.profile = data.profile
        this.isFollowed = data.isFollowed
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    commentedRestaurants () {
      const result = new Map()
      this.profile.Comments.forEach(e => {
        result.set(e.Restaurant.id, e.Restaurant)
      })
      return Array.from(result.values())
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  beforeRouteUpdate (to, from, next) {
    const id = to.params.id
    this.fetchUser(id)
    next()
  }
}
</script>

<style>
</style>
