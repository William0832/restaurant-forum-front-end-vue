import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const authorizedObj = { headers: { Authorization: `Bearer ${getToken()}` } }

export default {
  getRestaurants ({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(
      `/restaurants?${searchParams.toString()}`,
      authorizedObj
    )
  },
  getFeeds () {
    return apiHelper.get(
      '/restaurants/feeds',
      authorizedObj
    )
  },
  getTopRestaurants () {
    return apiHelper.get(
      '/restaurants/top',
      authorizedObj
    )
  }
}
