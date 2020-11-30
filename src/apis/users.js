import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const authorized = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })
export default {
  getCurrentUser () {
    // 比對 token 確認 currentUser
    return apiHelper.get('/get_current_user', authorized())
  },
  get ({ userId }) {
    return apiHelper.get(`/users/${userId}`, authorized())
  },
  addFavorite ({ restaurantId }) {
    return apiHelper.post(
      `/favorite/${restaurantId}`,
      null,
      authorized()
    )
  },
  deleteFavorite ({ restaurantId }) {
    return apiHelper.delete(
      `/favorite/${restaurantId}`,
      authorized()

    )
  },
  addLike ({ restaurantId }) {
    return apiHelper.post(
      `/like/${restaurantId}`,
      null,
      authorized()
    )
  },
  deleteLike ({ restaurantId }) {
    return apiHelper.delete(
      `/like/${restaurantId}`,
      authorized()
    )
  },
  getTopUsers () {
    return apiHelper.get(
      '/users/top',
      authorized()
    )
  },
  addFollowing ({ userId }) {
    return apiHelper.post(
      `/following/${userId}`,
      null,
      authorized()
    )
  },
  deleteFollowing ({ userId }) {
    return apiHelper.delete(
      `/following/${userId}`,
      authorized()
    )
  }
}
