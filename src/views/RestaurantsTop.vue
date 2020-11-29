<template lang="pug">
  .container.py-5
    NavTabs
    h1.mt-5 人氣餐廳
    hr
    .card.mb-3(
      style="max-width: 540px;margin: auto;"
      v-for="item in restaurants"
    )
      .row.no-gutters
        .col-md-4
          a(href="#")
            img.card-img(:src="emptyImage(item.image)")
        .col-md-8
          .card-body
            h5.card-title {{item.name}}
            span.badge.badge-secondary 收藏數：{{item.FavoriteCount}}
            p.card-text {{item.description}}
            router-link.btn.btn-primary.mr-2(:to="`/restaurants/${item.id}`") Show
            button.btn.btn-danger.mr-2(
              type="button"
              v-if="item.isFavorited"
              @click.prevent.stop="toggleFavorite(item.id)"
            ) 移除最愛
            button.btn.btn-primary(
              type="button"
              v-else
              @click.prevent.stop="toggleFavorite(item.id)"
            ) 加到最愛
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import { emptyImage } from '../utils/mixins'
const dummyData = {
  restaurants: [
    {
      id: 26,
      name: 'Eudora Casper',
      tel: '(148) 618-1282 x13780',
      address: '1745 Margret Glens',
      opening_hours: '08:00',
      description: 'Ut nihil optio consequatur. Et quidem corrupti cul',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=91.4615016363926',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 3,
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
            RestaurantId: 26,
            createdAt: '2020-04-17T04:35:49.000Z',
            updatedAt: '2020-04-17T04:35:49.000Z'
          }
        },
        {
          id: 3,
          name: 'user2',
          email: 'user2@example.com',
          password: '$2a$10$TPKFC8BS5/E37CFM3kx8yOPya6L5ifI0S8aFQ7b3jdA.oEzjXwYby',
          isAdmin: false,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Favorite: {
            UserId: 3,
            RestaurantId: 26,
            createdAt: '2020-07-15T19:27:21.000Z',
            updatedAt: '2020-07-15T19:27:21.000Z'
          }
        }
      ],
      isFavorited: false,
      FavoriteCount: 2
    },
    {
      id: 5,
      name: 'Cyrus Aufderhar',
      tel: '044-687-1298 x361',
      address: '62946 Kristofer Tunnel',
      opening_hours: '08:00',
      description: 'Occaecati voluptas odio perspiciatis delectus pari',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=96.10569340226543',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 1,
      FavoritedUsers: [
        {
          id: 3,
          name: 'user2',
          email: 'user2@example.com',
          password: '$2a$10$TPKFC8BS5/E37CFM3kx8yOPya6L5ifI0S8aFQ7b3jdA.oEzjXwYby',
          isAdmin: false,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Favorite: {
            UserId: 3,
            RestaurantId: 5,
            createdAt: '2020-07-15T06:37:49.000Z',
            updatedAt: '2020-07-15T06:37:49.000Z'
          }
        },
        {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$0dBI.8S//NhlGeouBUbV3.oBDkdbbqXObuMJyuS.PHxjzdW/PvqYy',
          isAdmin: true,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Favorite: {
            UserId: 1,
            RestaurantId: 5,
            createdAt: '2020-11-18T08:00:42.000Z',
            updatedAt: '2020-11-18T08:00:42.000Z'
          }
        }
      ],
      isFavorited: true,
      FavoriteCount: 2
    },
    {
      id: 3,
      name: 'Harold Hauck',
      tel: '(064) 036-6228 x6320',
      address: '024 Yost Inlet',
      opening_hours: '08:00',
      description: 'Delectus iusto facilis. Temporibus blanditiis quid',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=8.88156169757055',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 2,
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
            RestaurantId: 3,
            createdAt: '2020-03-24T16:54:31.000Z',
            updatedAt: '2020-03-24T16:54:31.000Z'
          }
        },
        {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$0dBI.8S//NhlGeouBUbV3.oBDkdbbqXObuMJyuS.PHxjzdW/PvqYy',
          isAdmin: true,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Favorite: {
            UserId: 1,
            RestaurantId: 3,
            createdAt: '2020-11-18T07:56:43.000Z',
            updatedAt: '2020-11-18T07:56:43.000Z'
          }
        }
      ],
      isFavorited: true,
      FavoriteCount: 2
    },
    {
      id: 47,
      name: 'Lorenzo Cremin',
      tel: '237-701-0423',
      address: '6963 Astrid Route',
      opening_hours: '08:00',
      description: 'Maiores quae voluptate possimus quia id omnis. Par',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=58.39944310924374',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 2,
      FavoritedUsers: [
        {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password: '$2a$10$0dBI.8S//NhlGeouBUbV3.oBDkdbbqXObuMJyuS.PHxjzdW/PvqYy',
          isAdmin: true,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Favorite: {
            UserId: 1,
            RestaurantId: 47,
            createdAt: '2020-03-05T08:20:32.000Z',
            updatedAt: '2020-03-05T08:20:32.000Z'
          }
        }
      ],
      isFavorited: true,
      FavoriteCount: 1
    },
    {
      id: 13,
      name: 'Vito Stroman',
      tel: '(583) 814-0267 x51316',
      address: '149 Nolan Bypass',
      opening_hours: '08:00',
      description: 'Minima neque eveniet. Ut reiciendis ducimus fugit ',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=55.830999586431275',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 5,
      FavoritedUsers: [
        {
          id: 3,
          name: 'user2',
          email: 'user2@example.com',
          password: '$2a$10$TPKFC8BS5/E37CFM3kx8yOPya6L5ifI0S8aFQ7b3jdA.oEzjXwYby',
          isAdmin: false,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Favorite: {
            UserId: 3,
            RestaurantId: 13,
            createdAt: '2020-03-30T01:34:36.000Z',
            updatedAt: '2020-03-30T01:34:36.000Z'
          }
        }
      ],
      isFavorited: false,
      FavoriteCount: 1
    },
    {
      id: 11,
      name: 'Earnestine Metz',
      tel: '(573) 917-8496 x01546',
      address: '364 Rafael Pines',
      opening_hours: '08:00',
      description: 'delectus',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=35.25135222681837',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 3,
      FavoritedUsers: [
        {
          id: 3,
          name: 'user2',
          email: 'user2@example.com',
          password: '$2a$10$TPKFC8BS5/E37CFM3kx8yOPya6L5ifI0S8aFQ7b3jdA.oEzjXwYby',
          isAdmin: false,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Favorite: {
            UserId: 3,
            RestaurantId: 11,
            createdAt: '2020-07-15T05:40:21.000Z',
            updatedAt: '2020-07-15T05:40:21.000Z'
          }
        }
      ],
      isFavorited: false,
      FavoriteCount: 1
    },
    {
      id: 9,
      name: 'Lindsay Stoltenberg',
      tel: '1-413-683-7333',
      address: '793 Valentine Walks',
      opening_hours: '08:00',
      description: 'laudantium',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=9.825477787450376',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 5,
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
            RestaurantId: 9,
            createdAt: '2020-03-24T08:51:28.000Z',
            updatedAt: '2020-03-24T08:51:28.000Z'
          }
        }
      ],
      isFavorited: false,
      FavoriteCount: 1
    },
    {
      id: 7,
      name: 'Loyce King',
      tel: '(243) 305-5940',
      address: '76836 Aufderhar Mission',
      opening_hours: '08:00',
      description: 'Rerum qui ea.',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=17.46646129183562',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 1,
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
            RestaurantId: 7,
            createdAt: '2020-06-08T08:12:16.000Z',
            updatedAt: '2020-06-08T08:12:16.000Z'
          }
        }
      ],
      isFavorited: false,
      FavoriteCount: 1
    },
    {
      id: 6,
      name: 'Dejuan Lemke',
      tel: '1-878-150-9084 x300',
      address: '399 Lueilwitz Islands',
      opening_hours: '08:00',
      description: 'Deleniti dolorem aut perferendis id sint voluptate',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=42.92691470956817',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 4,
      FavoritedUsers: [
        {
          id: 3,
          name: 'user2',
          email: 'user2@example.com',
          password: '$2a$10$TPKFC8BS5/E37CFM3kx8yOPya6L5ifI0S8aFQ7b3jdA.oEzjXwYby',
          isAdmin: false,
          image: null,
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Favorite: {
            UserId: 3,
            RestaurantId: 6,
            createdAt: '2020-07-17T11:47:59.000Z',
            updatedAt: '2020-07-17T11:47:59.000Z'
          }
        }
      ],
      isFavorited: false,
      FavoriteCount: 1
    },
    {
      id: 4,
      name: 'Gerry Ebert DVM',
      tel: '171-491-6764 x9283',
      address: '81624 McGlynn Skyway',
      opening_hours: '08:00',
      description: 'Non quia voluptas eum vero in illum ea asperiores ',
      image: 'https://loremflickr.com/320/240/restaurant,food/?random=57.05367081822943',
      viewCounts: 0,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      CategoryId: 3,
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
            RestaurantId: 4,
            createdAt: '2020-03-31T06:37:16.000Z',
            updatedAt: '2020-03-31T06:37:16.000Z'
          }
        }
      ],
      isFavorited: false,
      FavoriteCount: 1
    }
  ]
}
export default {
  mixins: [emptyImage],
  data () {
    return {
      restaurants: []
    }
  },
  components: {
    NavTabs
  },
  methods: {
    fetchRestaurants () {
      this.restaurants = dummyData.restaurants
    },
    toggleFavorite (id) {
      const target = this.restaurants.find(e => e.id === id)
      const state = target.isFavorited
      target.isFavorited = !state
    }
  },
  created () {
    this.fetchRestaurants()
  }
}
</script>
