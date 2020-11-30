<template lang="pug">
.container.py-5
  h1 餐廳詳細資料
  RestaurantDetail(:initial-restaurant="restaurant")
  RestaurantComments(
    :restaurant-comments.sync="restaurantComments"
  )
  CreateComment(
    :restaurantId="restaurant.id"
    @after-create-comment="afterCreateComment"
  )
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail'
import RestaurantComments from '../components/RestaurantComments'
import CreateComment from '../components/CreateComment'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: []
    }
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })
        console.log(data)
        if (data.status === 'error') throw new Error(data.message)
        const { restaurant, isFavorited, isLiked } = data
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments
        } = restaurant
        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked
        }
        this.restaurantComments = Comments
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    afterCreateComment (payload) {
      const { commentId, restaurantId, text } = payload
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
    }
    // afterDeleteComment (commentId) {
    //   this.restaurantComments = this.restaurantComments.filter(e => e.id !== commentId)
    // }
  },
  created () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  }
}
</script>

<style>
</style>
