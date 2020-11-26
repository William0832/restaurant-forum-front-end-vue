<template lang="pug">
.container.py-5
  h1 餐廳詳細資料
  RestaurantDetail(:initial-restaurant="restaurant")
  RestaurantComments(
    :restaurant-comments="restaurantComments"
    @after-delete-comment="afterDeleteComment"
  )
  //- CreateComment
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail'
import RestaurantComments from '../components/RestaurantComments'
// import CreateComment from '../components/CreateComment'
const dummyData = {
  restaurant: {
    id: 1,
    name: 'Maxie Trantow V',
    tel: '890-533-5519 x71749',
    address: '1268 Bosco Prairie',
    opening_hours: '08:00',
    description: 'ooxxoox',
    image: 'https://loremflickr.com/320/240/restaurant,food/?random=51.756313654300044',
    viewCounts: 2,
    createdAt: '2020-11-23T10:08:45.000Z',
    updatedAt: '2020-11-25T07:54:36.596Z',
    CategoryId: 4,
    Category: {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z'
    },
    FavoritedUsers: [
      {
        id: 2,
        name: 'user1',
        email: 'user1@example.com',
        password: '$2a$10$s7ShjXk/VR4nVoFtm9PLG.LR6x7wv77vwouGXoKssT7Xfk/rOsQZe',
        isAdmin: false,
        image: null,
        createdAt: '2020-11-23T10:08:45.000Z',
        updatedAt: '2020-11-23T10:08:45.000Z',
        Favorite: {
          UserId: 2,
          RestaurantId: 1,
          createdAt: '2020-03-07T14:43:52.000Z',
          updatedAt: '2020-03-07T14:43:52.000Z'
        }
      }
    ],
    LikedUsers: [
      {
        id: 2,
        name: 'user1',
        email: 'user1@example.com',
        password: '$2a$10$s7ShjXk/VR4nVoFtm9PLG.LR6x7wv77vwouGXoKssT7Xfk/rOsQZe',
        isAdmin: false,
        image: null,
        createdAt: '2020-11-23T10:08:45.000Z',
        updatedAt: '2020-11-23T10:08:45.000Z',
        Like: {
          UserId: 2,
          RestaurantId: 1,
          createdAt: '2020-03-07T14:42:45.000Z',
          updatedAt: '2020-03-07T14:42:45.000Z'
        }
      }
    ],
    Comments: [
      {
        id: 1,
        text: 'Ut nostrum velit esse autem nesciunt et.',
        UserId: 1,
        RestaurantId: 1,
        createdAt: '2020-11-23T10:08:45.000Z',
        updatedAt: '2020-11-23T10:08:45.000Z',
        User: {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$0dBI.8S//NhlGeouBUbV3.oBDkdbbqXObuMJyuS.PHxjzdW/PvqYy',
          isAdmin: true,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z'
        }
      },
      {
        id: 51,
        text: 'Eum doloremque a.',
        UserId: 2,
        RestaurantId: 1,
        createdAt: '2020-11-23T10:08:45.000Z',
        updatedAt: '2020-11-23T10:08:45.000Z',
        User: {
          id: 2,
          name: 'user1',
          email: 'user1@example.com',
          password: '$2a$10$s7ShjXk/VR4nVoFtm9PLG.LR6x7wv77vwouGXoKssT7Xfk/rOsQZe',
          isAdmin: false,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z'
        }
      },
      {
        id: 101,
        text: 'Explicabo praesentium aliquam.',
        UserId: 3,
        RestaurantId: 1,
        createdAt: '2020-11-23T10:08:45.000Z',
        updatedAt: '2020-11-23T10:08:45.000Z',
        User: {
          id: 3,
          name: 'user2',
          email: 'user2@example.com',
          password: '$2a$10$TPKFC8BS5/E37CFM3kx8yOPya6L5ifI0S8aFQ7b3jdA.oEzjXwYby',
          isAdmin: false,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z'
        }
      }
    ]
  },
  isFavorited: false,
  isLiked: false
}

export default {
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: []
    }
  },
  methods: {
    fetchRestaurant (id) {
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        categoryName: dummyData.restaurant.Category.name,
        image: dummyData.restaurant.image,
        openingHours: dummyData.restaurant.opening_hours,
        tel: dummyData.restaurant.tel,
        address: dummyData.restaurant.address,
        description: dummyData.restaurant.description,
        isFavorited: dummyData.isFavorited,
        isLiked: dummyData.isLiked
      }

      this.restaurantComments = dummyData.restaurant.Comments
    },
    afterDeleteComment (commentId) {
      this.restaurantComments = this.restaurantComments.filter(e => e.id !== commentId)
    }
  },
  created () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  components: {
    RestaurantDetail,
    RestaurantComments
  // CreateComment
  }
}
</script>

<style>
</style>
