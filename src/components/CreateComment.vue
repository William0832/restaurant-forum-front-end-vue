<template lang="pug">
form(@submit.stop.prevent="submitHandler")
  .form-group.mb-4
    label(for="text") 留下評論：
    textarea.form-control(
      rows="3"
      name="text"
      v-model.trim="text"
    )
    .d-flex.align-items-center.justify-content-between
      button.btn.btn-link(type="button", @click="$router.back()") 回上一頁
      button.btn.btn-primary.mr-0(
        :disabled="isProcessing"
        type="submit"
      ) Submit
</template>

<script>
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
export default {
  props: {
    restaurantId: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      isProcessing: false,
      text: ''
    }
  },
  methods: {
    async submitHandler () {
      try {
        if (!this.text) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫評價'
          })
          return
        }
        this.isProcessing = true
        const { data } = await restaurantsAPI.comments.create(this.text, this.restaurantId)
        if (data.status === 'error') throw new Error(data.message)
        const payload = {
          commentId: data.commentId,
          restaurantId: this.restaurantId,
          text: this.text
        }
        this.$emit('after-create-comment', payload)
        this.text = ''
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法新增評論，請稍後再試'
        })
      }
    }
  }
}
</script>
