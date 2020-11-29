<template lang="pug">
.container.py-5
  AdminRestaurantForm(@after-submit="afterSubmitHandler")
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm.vue'

export default {
  components: {
    AdminRestaurantForm
  },
  methods: {
    afterSubmitHandler (formData) {
      // TODO: CALL API 新增 餐廳
      for (const [k, v] of formData.entries()) {
        console.log(k, ':', v)
      }
      console.log('afterSubmitHandler', formData)
    }
  }
}
</script>
