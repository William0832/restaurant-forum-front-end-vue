<template lang="pug">
  form(@submit.stop.prevent="submitHandler")
    .form-group
      label(for="name") Name
      input.form-control(
        id="name"
        type="text"
        name="name"
        placeholder="Enter name"
        v-model="restaurant.name"
        required
      )
    .form-group
      label(for="categoryId") Category
      select.form-control(
        id="categoryId"
        name="categoryId"
        v-model="restaurant.categoryId"
        required
      )
        option(
          value=""
          selected
          disabled
        ) --請選擇--
        option(
          v-for="item in categories"
          :key="item.id"
          :value="item.id"
        ) {{item.name}}
    .form-group
      label(for="tel") Tel
      input#tel.form-control(
        v-model="restaurant.tel"
        type="text"
        name="tel"
        placeholder="Enter telephone number"
      )
    .form-group
      label(for="address") Address
      input#address.form-control(
        v-model="restaurant.address"
        type="text"
        placeholder="Enter address"
        name="address"
      )
    .form-group
      label(for="opening-hours") Opening Hours
      input#opening-hours.form-control(
        v-model="restaurant.openingHours"
        type="time"
        name="opening_hours"
      )
    .form-group
      label(for="description") Description
      textarea#description.form-control(
        v-model="restaurant.description"
        rows="3"
        name="description"
      )
    .form-group
      label(for="image") Image
      //- TODO:
      img.d-block.img-thumbnail.mb-3(
        v-if="restaurant.image"
        :src="restaurant.image"
        width="200"
        height="200"
      )
      input#image.form-control-file(
        type="file"
        name="image"
        accept="image/*"
        @change="fileChangeHandler"
      )
    button.btn.btn-primary(type="submit") 送出
</template>
<script>
import { fileChangeHandler } from '../utils/mixins'
const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  ]
}

export default {
  mixins: [fileChangeHandler],
  props: {
    initialRestaurant: {
      type: Object,
      default: () => ({
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      })
    }
  },
  data () {
    return {
      restaurant: {
        ...this.initialRestaurant
      },
      categories: []
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    fetchCategories () {
      this.categories = dummyData.categories
    },
    submitHandler (e) {
      const form = e.target
      const formData = new FormData(form)
      console.log('submitHandler', formData)

      this.$emit('after-submit', formData)
    }
  }
}
</script>
