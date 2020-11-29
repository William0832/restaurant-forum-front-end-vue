<template lang="pug">
.container.py-5
  AdminRestaurantForm(
    @after-submit="afterSubmitHandler"
    :is-processing="isProcessing"
  )
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
export default {
  components: {
    AdminRestaurantForm
  },
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    async afterSubmitHandler (formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.create({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'admin-restaurants' })
      } catch (err) {
        console.log(err)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳資料，請稍後再試'
        })
      }
    }
  }
}
</script>
