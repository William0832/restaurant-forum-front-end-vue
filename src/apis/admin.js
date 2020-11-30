import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const authorized = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })
export default {
  categories: {
    get () {
      return apiHelper.get('/admin/categories', authorized())
    },
    create (categoryName) {
      return apiHelper.post('/admin/categories', { name: categoryName }, authorized())
    },
    delete (categoryId) {
      return apiHelper.delete(`/admin/categories/${categoryId}`, authorized())
    },
    update (categoryId, name) {
      return apiHelper.put(`/admin/categories/${categoryId}`, { name }, authorized())
    }
  },
  restaurants: {
    getDetail ({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, authorized())
    },
    create ({ formData }) {
      return apiHelper.post('/admin/restaurants', formData, authorized())
    },
    get () {
      return apiHelper.get('/admin/restaurants', authorized())
    },
    delete ({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, authorized())
    },
    update ({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, authorized())
    }

  },
  users: {
    get () {
      return apiHelper.get('/admin/users', authorized())
    }
    // updateRole ({ userId }) {
    //   return apiHelper.put(`/admin/users/${userId}`, authorized())
    // }
  }
}
