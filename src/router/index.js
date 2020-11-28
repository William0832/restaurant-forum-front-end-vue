import Vue from 'vue'
import VueRouter from 'vue-router'
import NoFound from '../views/NotFound.vue'
import Signin from '../views/Signin.vue'
import Restaurants from '../views/Restaurants.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: 'restaurants'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: Signin
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import('../views/SignUp.vue')
    }, {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants
    },
    {
      path: '/restaurants/feeds',
      name: 'restaurants-feeds',
      component: () => import('../views/RestaurantsFeeds.vue')
    }, {
      path: '/restaurants/top',
      name: 'restaurants-top',
      component: () => import('../views/RestaurantsTop.vue')
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant',
      component: () => import('../views/Restaurant.vue')
    },
    {
      path: '/restaurants/:id/dashboard',
      name: 'dashboard',
      component: () => import('../views/RestaurantDashboard.vue')
    },
    {
      path: '/users/top',
      name: 'users-top',
      component: () => import('../views/UsersTop.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('../views/User.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NoFound
    }
  ]
})
