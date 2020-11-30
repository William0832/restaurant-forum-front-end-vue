import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const authorized = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })

export default {
  getRestaurant ({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`, authorized())
  },
  getRestaurants ({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(
      `/restaurants?${searchParams.toString()}`,
      authorized()
    )
  },
  getFeeds () {
    return apiHelper.get(
      '/restaurants/feeds',
      authorized()
    )
  },
  getTopRestaurants () {
    return apiHelper.get(
      '/restaurants/top',
      authorized()
    )
  },
  comments: {
    create (text, restaurantId) {
      return apiHelper.post('/comments', { text, restaurantId }, authorized())
    },
    delete (commentId) {
      return apiHelper.delete(`/comments/${commentId}`, authorized())
    }
  }
}
