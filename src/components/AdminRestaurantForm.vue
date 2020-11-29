<template lang="pug">
  form(
    v-show="!isLoading"
    @submit.stop.prevent="submitHandler"
    )
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
    button.btn.btn-primary(
      :disabled="isProcessing"
      type="submit"
    ) {{ isProcessing ? '處理中' : '送出' }}
</template>
<script>
import { fileChangeHandler } from '../utils/mixins'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
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
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      restaurant: {
        ...this.initialRestaurant
      },
      categories: [],
      isLoading: true
    }
  },
  created () {
    this.fetchCategories()
  },
  watch: {
    initialRestaurant (nv) {
      this.restaurant = {
        ...this.restaurant,
        ...nv
      }
    }
  },
  methods: {
    async fetchCategories () {
      try {
        const { data } = await adminAPI.categories.get()
        this.categories = data.categories
        this.isLoading = false
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '舞法取得類別，請稍後再試'
        })
      }
      // this.categories = dummyData.categories
    },
    submitHandler (e) {
      if (!this.restaurant.name) {
        Toast.fire({
          icon: 'warning',
          title: '請選擇餐廳名稱'
        })
        return
      }
      if (!this.restaurant.categoryId) {
        Toast.fire({
          icon: 'warning',
          title: '請選擇餐廳類別'
        })
        return
      }
      const form = e.target
      const formData = new FormData(form)
      console.log('submitHandler', formData)

      this.$emit('after-submit', formData)
    }
  }
}
</script>
