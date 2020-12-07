<template lang="pug">
.container.py-5
  NavTabs
  RestaurantsNavPills(:categories="categories")
  Spinner(v-if="isLoading")
  template(v-else)
    .row
      RestaurantCard(
        v-for="item in restaurants",
        :key="item.id",
        :initial-restaurant="item"
      )
    RestaurantPagination(
      :category-id="categoryIdHandler",
      :current-page="currentPage",
      :total-page="totalPage.length"
    )
    div(v-if="restaurants.length < 1") 此類別目前無餐廳資料
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import RestaurantsNavPills from '../components/RestaurantsNavPills'
import RestaurantPagination from '../components/RestaurantPagination.vue'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'
import Spinner from '../components/Spinner'
export default {
  data () {
    return {
      restaurants: [],
      categories: [],
      currentPage: null,
      totalPage: [],
      categoryId: null,
      isLoading: true
    }
  },
  computed: {
    categoryIdHandler () {
      return this.categoryId === '' ? 0 : this.categoryId
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
        this.isLoading = false
      } catch (err) {
        this.isLoading = false

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
    this.isLoading = true
    const { page = '', categoryId = '' } = to.query
    console.log('router-categortId', categoryId)
    this.fetchRestaurants({ page, categoryId })
    next()
  },
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantPagination,
    Spinner
  }
}
</script>
