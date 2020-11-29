<template lang="pug">
.container.py-5
  NavTabs
  h1.mt-5 最新動態
  hr
  .row
    .col-md-6
      NewestRestaurants(:restaurants='restaurants')
    .col-md-6
      NewestComments(:comments='comments')
</template>
<script>
import NavTabs from '../components/NavTabs.vue'
import NewestRestaurants from '@/components/NewestRestaurants.vue'
import NewestComments from '@/components/NewestComments.vue'
import { Toast } from '../utils/helpers'
import restaurantsAPI from '../apis/restaurants'
export default {
  data () {
    return {
      restaurants: [],
      comments: []
    }
  },
  methods: {
    async fetchFeeds () {
      try {
        const res = await restaurantsAPI.getFeeds()
        const { restaurants, comments } = res.data
        this.restaurants = restaurants
        this.comments = comments
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取的最新動態，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchFeeds()
  },
  components: {
    NavTabs, NewestRestaurants, NewestComments
  }
}
</script>
