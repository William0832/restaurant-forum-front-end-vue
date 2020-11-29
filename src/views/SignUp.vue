<template lang="pug">
.container.py-5
  form.w-100(@submit.prevent="submitHandler")
    .text-center.mb-4
      h1.h3.mb-3.font-weight-normal Sign Up
    .form-label-group.mb-2
      label(for="name") Name
      input#name.form-control(
        v-model="name"
        name="name"
        type="text"
        placeholder="name"
        autocomplete="username"
        required
        autofocus)
    .form-label-group.mb-2
      label(for="email") Email
      input#email.form-control(
        v-model="email"
        name="email"
        type="email"
        placeholder="email"
        autocomplete="email"
        required)
    .form-label-group.mb-3
      label(for="password") Password
      input#password.form-control(
        v-model="password"
        name="password"
        type="password"
        placeholder="Password"
        autocomplete="new-password"
        required)
    .form-label-group.mb-3
      label(for="password-check") Password Check
      input#password-check.form-control(
        v-model="passwordCheck"
        name="passwordCheck"
        type="password"
        placeholder="Password"
        autocomplete="new-password"
        required)
    button.btn.btn-lg.btn-primary.btn-block.mb-3(
      :disabled="isProcessing"
      type="submit"
    ) Submit
    .text-center.mb-3
      p
        router-link(to="/signin") Sign In
    p.mt-5.mb-3.text-muted.text-center.
      © 2019-2020
</template>
<script>
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'
export default {
  data () {
    return {
      isProcessing: false,
      name: '',
      email: '',
      password: '',
      passwordCheck: ''
    }
  },
  methods: {
    async submitHandler () {
      try {
        if (!this.name || !this.email || !this.password || !this.passwordCheck) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入完整資訊'
          })
          return
        }
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: 'warning',
            title: '兩次密碼不同，請再確認'
          })
          return
        }
        if (!this.email.includes('@')) {
          Toast.fire({
            icon: 'warning',
            title: '請確認 email 格式'
          })
          return
        }
        this.isProcessing = true
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        }
        const { data } = await authorizationAPI.signup({ payload })
        this.$router.push({ name: 'restaurants' })
        if (data.status !== 'success') throw new Error(data.message)
      } catch (err) {
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法註冊帳號，請稍後再試'
        })
      }
    }
  }
}
</script>
