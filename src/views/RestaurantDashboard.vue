<template lang="pug">
.container.py-5
  div
    h1 {{ restaurant.name }}
      span.badge.badge-secondary.mt-1.mb-3 {{ restaurant.categoryName }}
  hr
  ul
    li 評論數： {{ restaurant.commentsLength }}
    li 瀏覽次數： {{ restaurant.viewCounts }}
  button.btn.btn-link(
    type="button"
    @click="$router.back()"
  ) 回上一頁
</template>

<script>
const dummyData = {
  restaurant: {
    id: 1,
    name: 'Maxie Trantow V',
    tel: '890-533-5519 x71749',
    address: '1268 Bosco Prairie',
    opening_hours: '08:00',
    description: 'Officiis aut excepturi ipsa. Et ratione eveniet unde laboriosam aut. Explicabo autem eos pariatur aut molestiae perspiciatis debitis. Et repellat consequatur sapiente velit.',
    image: 'https://loremflickr.com/320/240/restaurant,food/?random=51.756313654300044',
    viewCounts: 3,
    createdAt: '2020-11-23T10:08:45.000Z',
    updatedAt: '2020-11-25T15:01:45.000Z',
    CategoryId: 4,
    Category: {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z'
    },
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
  }
}
export default {
  dtat () {
    return {
      restaurant: []
    }
  },
  methods: {
    fetchRestaurant () {
      this.restaurant = dummyData.restaurant
    }
  },
  created () {
    this.fetchRestaurant()
  }
}
</script>
