import { apiHelper } from './../utils/helpers'

export default {
  getDashboard ({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}/dashboard`)
  },
  getRestaurant ({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  getRestaurants ({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getFeeds () {
    return apiHelper.get('/restaurants/feeds')
  },
  getTopRestaurants () {
    return apiHelper.get('/restaurants/top')
  },
  comments: {
    create (text, restaurantId) {
      return apiHelper.post('/comments', { text, restaurantId })
    },
    delete (commentId) {
      return apiHelper.delete(`/comments/${commentId}`)
    }
  }
}
