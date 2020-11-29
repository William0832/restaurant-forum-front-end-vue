import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const authorizedObj = { headers: { Authorization: `Bearer ${getToken()}` } }
export default {
  addFavorite ({ restaurantId }) {
    return apiHelper.post(
      `/favorite/${restaurantId}`,
      null,
      authorizedObj
    )
  },
  deleteFavorite ({ restaurantId }) {
    return apiHelper.delete(
      `/favorite/${restaurantId}`,
      authorizedObj

    )
  },
  addLike ({ restaurantId }) {
    return apiHelper.post(
      `/like/${restaurantId}`,
      null,
      authorizedObj
    )
  },
  deleteLike ({ restaurantId }) {
    return apiHelper.delete(
      `/like/${restaurantId}`,
      authorizedObj
    )
  },
  getTopUsers () {
    return apiHelper.get(
      '/users/top',
      authorizedObj
    )
  },
  addFollowing ({ userId }) {
    return apiHelper.post(
      `/following/${userId}`,
      null,
      authorizedObj
    )
  },
  deleteFollowing ({ userId }) {
    return apiHelper.delete(
      `/following/${userId}`,
      authorizedObj
    )
  }
}
