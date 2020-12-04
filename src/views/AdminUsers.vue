<template lang="pug">
.container.py-5
  AdminNav
  table.table
    thead.thead-dark
      tr
        th(scope="col") #
        th(scope="col") Email
        th(scope="col") Role
        th(scope="col", width="140") Action
    tbody
      tr(
          v-for="user in users"
          :key="user.id"
        )
        th(scope="row") {{user.id}}
        td {{user.email}}
        td
          span(v-show="user.isAdmin") admin
          span(v-show="!user.isAdmin") user
        td
          button.btn.btn-link(
            @click="toggleRole(user.id)"
            type="button"
            :disabled="user.id === currentUser.id"
          )
            span(v-show="user.isAdmin") Set as user
            span(v-show="!user.isAdmin") Set as admin
</template>

<script>
import AdminNav from '../components/AdminNav'
import { Toast } from '../utils/helpers.js'
import adminAPI from '../apis/admin'
import { mapState } from 'vuex'
export default {
  components: { AdminNav },
  data () {
    return {
      users: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchUsers () {
      try {
        const { data } = await adminAPI.users.get()
        this.users = data.users
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者的資料，請稍後再試'
        })
      }
    },
    async toggleRole (userId) {
      try {
        const target = this.users.find(e => e.id === userId)
        const payload = { isAdmin: (!target.isAdmin).toString() } // API 有點雷 boolean 還要轉字串
        const { data } = await adminAPI.users.updateRole({ userId, payload })
        if (data.status !== 'success') throw new Error(data.message)
        target.isAdmin = !target.isAdmin
      } catch (err) {
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者權限，請稍後再試'
        })
      }
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>

<style>
</style>
