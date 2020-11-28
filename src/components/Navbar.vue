<template lang="pug">
nav.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-dark
  router-link.navbar-brand(to='/') 餐廳評論網
  button.navbar-toggler(
    type='button',
    data-toggle='collapse',
    data-target='#navbarSupportedContent',
    aria-controls='navbarSupportedContent',
    aria-expanded='false',
    aria-label='Toggle navigation'
  )
    span.navbar-toggler-icon
  #navbarSupportedContent.navbar-collapse.collapse
    .ml-auto.d-flex.align-items-center
      router-link.text-white.mr-3(
        :to="{ name: 'admin-restaurants' }"
        v-if='currentUser.isAdmin') 管理員後台
      template(v-if='isAuthenticated')
        router-link.text-white.mr-3(to='#') {{ currentUser.name || "使用者" }}您好
        button.btn.btn-sm.btn-outline-success.my-2.my-sm-0(type='button') 登出
</template>
<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}
export default {
  data () {
    return {
      currentUser: {},
      isAuthenticated: false
    }
  },
  methods: {
    fetchUser () {
      this.currentUser = {
        ...dummyUser.currentUser
      }
      this.isAuthenticated = dummyUser.isAuthenticated
    }
  },
  created () {
    this.fetchUser()
  }
}
</script>
