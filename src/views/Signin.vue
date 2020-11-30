<template lang="pug">
.container.py-5
  form.w-100(@submit.prevent="submitHandler")
    .text-center.mb-4
      h1.h3.mb-3.font-weight-normal Sign In
    .form-label-group.mb-2
      label(for='email') email
      input#email.form-control(
        v-model='email',
        name='email',
        type='email',
        placeholder='email',
        autocomplete='username',
        required,
        autofocus
      )
    .form-label-group.mb-3
      label(for='password') Password
      input#password.form-control(
        v-model='password',
        name='password',
        type='password',
        placeholder='Password',
        autocomplete='current-password',
        required
      )
    button.btn.btn-lg.btn-primary.btn-block.mb-3(
      :disabled="isProcessing"
      type='submit'
    ) Submit
    .text-center.mb-3
      p
        router-link(to="/signup") sign up
    p.mt-5.mb-3.text-muted.text-center © 2019-2020
</template>

<script>
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'
export default {
  data () {
    return {
      isProcessing: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async submitHandler () {
      if (!this.email || !this.password) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入完整 email or password'
        })
        return
      }
      this.isProcessing = true
      try {
        const res = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })
        const { data } = res
        if (data.status !== 'success') throw new Error(data.message)

        localStorage.setItem('token', data.token)

        this.$store.commit('setCurrentUser', data.user)

        this.$router.push('/restaurants')
      } catch (err) {
        console.log(err)
        this.password = ''
        Toast.fire({
          icon: 'warning',
          title: '輸入帳號 or 密碼有誤'
        })
        this.isProcessing = false
      }
    }
  }
}
</script>
