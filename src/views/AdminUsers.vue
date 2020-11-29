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
          )
            span(v-show="user.isAdmin") Set as user
            span(v-show="!user.isAdmin") Set as admin
</template>

<script>
import AdminNav from '../components/AdminNav'
const dummyData = {
  users: [
    {
      id: 1,
      name: 'root',
      email: 'root@example.com',
      password: '$2a$10$0dBI.8S//NhlGeouBUbV3.oBDkdbbqXObuMJyuS.PHxjzdW/PvqYy',
      isAdmin: true,
      image: null,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z'
    },
    {
      id: 2,
      name: 'user1',
      email: 'user1@example.com',
      password: '$2a$10$s7ShjXk/VR4nVoFtm9PLG.LR6x7wv77vwouGXoKssT7Xfk/rOsQZe',
      isAdmin: false,
      image: null,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z'
    },
    {
      id: 3,
      name: 'user2',
      email: 'user2@example.com',
      password: '$2a$10$TPKFC8BS5/E37CFM3kx8yOPya6L5ifI0S8aFQ7b3jdA.oEzjXwYby',
      isAdmin: false,
      image: null,
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z'
    },
    {
      id: 902,
      name: 'Serena',
      email: 'serena@gmail.com',
      password: '$2a$10$qh4WPjAiZsOxg2sCF2KEP.4P7p9kS6vAeTujIr3cZXfE3vaWVqUMO',
      isAdmin: false,
      image: null,
      createdAt: '2020-11-23T10:13:44.000Z',
      updatedAt: '2020-11-23T10:13:44.000Z'
    }
  ]
}

export default {
  components: { AdminNav },
  data () {
    return {
      users: []
    }
  },
  methods: {
    fetchUsers () {
      this.users = dummyData.users
    },
    toggleRole (userId) {
      const target = this.users.find(e => e.id === userId)
      target.isAdmin = !target.isAdmin
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>

<style>
</style>
