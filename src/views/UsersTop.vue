<template lang="pug">
.container.py-5
  NavTabs
  Spinner(v-if="isLoading")
  template(v-else)
    h1.mt-5 美食達人
    hr
    .row.text-center
      UserCard(v-for="user in topUsers", :key="user.id", :initialUser="user")
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserCard from '../components/UserCard'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import Spinner from '../components/Spinner'
export default {
  data () {
    return {
      users: [],
      isLoading: true
    }
  },
  computed: {
    topUsers () {
      return this.users.filter(e => e.followerCount > 0).sort((a, b) => b.followerCount - a.followerCount)
    }
  },
  methods: {
    async fetchUser () {
      try {
        const { data } = await usersAPI.getTopUsers()
        this.users = data.users.map(e => ({
          id: e.id,
          name: e.name,
          image: e.image,
          followerCount: e.FollowerCount,
          isFollowed: e.isFollowed
        }))
        this.isLoading = false
      } catch (err) {
        this.isLoading = false

        console.log(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得 TOP USER，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchUser()
  },
  components: {
    NavTabs,
    UserCard,
    Spinner
  }
}
</script>
