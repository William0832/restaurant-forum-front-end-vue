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
    button.btn.btn-lg.btn-primary.btn-block.mb-3(type="submit") Submit
    .text-center.mb-3
      p
        router-link(to="/signin") Sign In
    p.mt-5.mb-3.text-muted.text-center.
      © 2019-2020
</template>
<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: ''
    }
  },
  methods: {
    submitHandler () {
      const data = JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
        passwordCheck: this.passwordCheck
      })
      console.log(data)
    }
  }
}
</script>
