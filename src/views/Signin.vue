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
    button.btn.btn-lg.btn-primary.btn-block.mb-3(type='submit') Submit
    .text-center.mb-3
      p
        router-link(to="/signup") sign up
    p.mt-5.mb-3.text-muted.text-center © 2019-2020
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitHandler () {
      const data = JSON.stringify({
        email: this.email,
        password: this.password
      })
      console.log(data)
    }
  }
}
</script>
