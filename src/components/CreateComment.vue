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
      button.btn.btn-primary.mr-0(type="submit") Submit
</template>

<script>
import { v4 as uuid } from 'uuid'
export default {
  props: {
    restaurantId: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    submitHandler () {
      // TODO: post new comment by API
      // this.$emit('after-create-comment', comment)
      const payload = {
        commentId: uuid(), // temp id
        restaurantId: this.restaurantId,
        text: this.text
      }
      // console.log(payload)
      this.$emit('after-create-comment', payload)
      this.text = '' // 將表單內的資料清空
    }
  }
}
</script>
