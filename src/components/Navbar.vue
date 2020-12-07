<template lang="pug">
nav.navbar.navbar-expand-lg.fixed-top.navbar-dark.bg-dark
  router-link.navbar-brand(to="/") 餐廳評論網
  button.navbar-toggler(
    type="button",
    data-toggle="collapse",
    data-target="#navbarSupportedContent",
    aria-controls="navbarSupportedContent",
    aria-expanded="false",
    aria-label="Toggle navigation"
  )
    span.navbar-toggler-icon
  #navbarSupportedContent.navbar-collapse.collapse
    .ml-auto.d-flex.align-items-center
      router-link.text-white.mr-3(
        :to="{ name: 'admin-restaurants' }",
        v-if="currentUser.isAdmin"
      ) 管理員後台
      template(v-if="isAuthenticated")
        router-link.text-white.mr-3(:to="`users/${currentUser.id}`") {{ currentUser.name || '使用者' }}您好
        button.btn.btn-sm.btn-outline-success.my-2.my-sm-0(
          @click="logout",
          type="button"
        ) 登出
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
    }
  }
}
</script>
