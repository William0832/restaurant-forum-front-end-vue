<template lang="pug">
.container.py-5
  .row
    .col-md-12
      h1 {{ restaurant.name }}
      span.badge.badge-secondary.mt-1.mb-3 {{ restaurant.categoryName}}
    .col-md-4
      img.img-responsive.center-block(
        :src="emptyImage(restaurant.image)"
        style="width: 250px; margin-bottom: 25px")
      .well
        ul.list-unstyled
          li
            strong Opening Hour:
            | {{ restaurant.openingHours }}
          li
            strong Tel:
            | {{ restaurant.tel }}

          li
            strong Address:
            | {{ restaurant.address }}
    .col-md-8
      p {{ restaurant.description }}
  hr
  button.btn.btn-link(
    type="button"
    @click="$router.back()"
  )  回上一頁

</template>
<script>
import { emptyImage } from './../utils/mixins'

const dummyData = {
  restaurant: {
    id: 2,
    name: 'Ardella Batz',
    tel: '793.250.7899 x5826',
    address: '814 Lubowitz Turnpike',
    opening_hours: '08:00',
    description: 'Ipsum sint in impedit. Occaecati ipsum ut. Necessitatibus id culpa.\n \rNatus ipsa quis molestiae ab aperiam expedita enim impedit. Eius velit iure fugiat quibusdam. Autem ipsam voluptate voluptatem nihil. Vel ut iure alias. Eius nihil quis doloremque. Sint officia atque sunt amet fuga nihil ducimus.\n \rLabore laborum rerum tempore ratione consequatur dolorem. Veritatis sint nisi dolor hic ut ut aut alias veritatis. Et commodi officiis vero reiciendis provident. Soluta sit doloribus autem qui quo molestias magni unde quibusdam.',
    image: 'https://loremflickr.com/320/240/restaurant,food/?random=74.39642698470448',
    viewCounts: 1,
    createdAt: '2020-11-23T10:08:45.000Z',
    updatedAt: '2020-11-25T14:57:53.000Z',
    CategoryId: 5,
    Category: {
      id: 5,
      name: '素食料理',
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z'
    }
  }
}
export default {
  mixins: [emptyImage],
  data () {
    return {
      restaurant: {
        id: '',
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: ''
      }
    }
  },
  methods: {
    fetchRestaurant (restaurantId) {
      const { restaurant } = dummyData
      const { name, id, Category, opening_hours: openingHours, image, tel, address, description } = restaurant
      this.restaurant = {
        id,
        name,
        categoryName: Category ? Category.name : '未分類',
        image,
        openingHours,
        tel,
        address,
        description
      }
    }
  },
  mounted () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  }
}
</script>
