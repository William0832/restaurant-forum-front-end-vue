import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const authorizedObj = { headers: { Authorization: `Bearer ${getToken()}` } }
export default {
  categories: {
    get () {
      return apiHelper.get('/admin/categories', authorizedObj)
    }
  },
  restaurants: {
    getDetail ({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, authorizedObj)
    },
    create ({ formData }) {
      return apiHelper.post('/admin/restaurants', formData, authorizedObj)
    },
    get () {
      return apiHelper.get('/admin/restaurants', authorizedObj)
    },
    delete ({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, authorizedObj)
    },
    update ({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, authorizedObj)
    }

  },
  users: {
    get () {
      return apiHelper.get('/admin/users', authorizedObj)
    }
    // updateRole ({ userId }) {
    //   return apiHelper.put(`/admin/users/${userId}`, authorizedObj)
    // }
  }
}
