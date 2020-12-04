import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser () {
    // 比對 token 確認 currentUser
    return apiHelper.get('/get_current_user')
  },
  get ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  put ({ userId, payload }) {
    return apiHelper.put(`/users/${userId}`, payload)
  },
  addFavorite ({ restaurantId }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null)
  },
  deleteFavorite ({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },
  addLike ({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null)
  },
  deleteLike ({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`)
  },
  getTopUsers () {
    return apiHelper.get('/users/top')
  },
  addFollowing ({ userId }) {
    return apiHelper.post(`/following/${userId}`, null)
  },
  deleteFollowing ({ userId }) {
    return apiHelper.delete(`/following/${userId}`)
  }
}
