<template lang="pug">
.container.py-5
  NavTabs
  RestaurantsNavPills(:categories="categories")
  .row
    RestaurantCard(
      v-for="item in restaurants"
      :key="item.id"
      :initial-restaurant="item"
    )
  RestaurantPagination(
    :category-Id = "categoryId"
    :current-page="currentPage"
    :total-page="totalPage.length"
  )
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import RestaurantsNavPills from '../components/RestaurantsNavPills'
import RestaurantPagination from '../components/RestaurantPagination.vue'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'
export default {
  data () {
    return {
      restaurants: [],
      categories: [],
      currentPage: undefined,
      totalPage: [],
      categoryId: undefined
    }
  },
  methods: {
    async fetchRestaurants ({ page, categoryId }) {
      try {
        const res = await restaurantsAPI.getRestaurants({
          page,
          categoryId
        })
        const { data } = res
        this.restaurants = data.restaurants
        this.categories = data.categories
        this.categoryId = data.categoryId
        this.currentPage = data.page
        this.totalPage = data.totalPage
        this.previousPage = data.prev
        this.nextPage = data.next
      } catch (err) {
        console.error('err:', err)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廷資料，清稍後再試'
        })
      }
    }
  },
  created () {
    const { page = '', categoryId = '' } = this.$route.query
    this.fetchRestaurants({
      page,
      categoryId
    })
  },
  beforeRouteUpdate (to, from, next) {
    const { page = '', categoryId = '' } = to.query
    this.fetchRestaurants({ page, categoryId })
    next()
  },
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantPagination
  }
}
</script>
