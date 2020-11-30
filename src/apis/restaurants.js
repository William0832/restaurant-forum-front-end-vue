import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const authorized = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })

export default {
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
  }
}
