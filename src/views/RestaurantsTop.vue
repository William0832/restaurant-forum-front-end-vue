<template lang="pug">
  .container.py-5
    NavTabs
    h1.mt-5 人氣餐廳
    hr
    .card.mb-3(
      style="max-width: 540px;margin: auto;"
      v-for="item in restaurants"
    )
      .row.no-gutters
        .col-md-4
          a(href="#")
            img.card-img(:src="emptyImage(item.image)")
        .col-md-8
          .card-body
            h5.card-title {{item.name}}
            span.badge.badge-secondary 收藏數：{{item.FavoriteCount}}
            p.card-text {{item.description}}
            router-link.btn.btn-primary.mr-2(:to="`/restaurants/${item.id}`") Show
            button.btn.btn-danger.mr-2(
              type="button"
              v-if="item.isFavorited"
              @click.prevent.stop="toggleFavorite(item.id)"
            ) 移除最愛
            button.btn.btn-primary(
              type="button"
              v-else
              @click.prevent.stop="toggleFavorite(item.id)"
            ) 加到最愛
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import { emptyImage } from '../utils/mixins'
import { Toast } from '../utils/helpers'
import restaurantsAPI from '../apis/restaurants'
import usersAPI from '../apis/users'
export default {
  mixins: [emptyImage],
  data () {
    return {
      restaurants: []
    }
  },
  components: {
    NavTabs
  },
  methods: {
    async fetchRestaurants () {
      try {
        const { data } = await restaurantsAPI.getTopRestaurants()
        this.restaurants = data.restaurants
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得 TOP USER ， 請稍後再試'
        })
      }
    },
    async toggleFavorite (restaurantId) {
      try {
        const target = this.restaurants.find(e => e.id === restaurantId)
        target.isFavorited = !target.isFavorited
        target.FavoriteCount = target.isFavorited ? target.FavoriteCount + 1 : target.FavoriteCount - 1
        const { data } = target.isFavorited
          ? await usersAPI.addFavorite({ restaurantId })
          : await usersAPI.deleteFavorite({ restaurantId })
        if (data.status !== 'success') throw new Error(data.message)
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法修改我的最愛，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchRestaurants()
  }
}
</script>
