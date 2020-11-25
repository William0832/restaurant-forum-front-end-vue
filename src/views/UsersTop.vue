<template lang="pug">
.container.py-5
  NavTabs
  h1.mt-5 美食達人
  hr
  .row.text-center
    UserCard(
      v-for="user in topUsers"
      :key="user.id"
      :initialUser="user"
    )
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserCard from '../components/UserCard'
const dummyData = {
  users: [
    {
      id: 2,
      name: 'user1',
      email: 'user1@example.com',
      password: '$2a$10$s7ShjXk/VR4nVoFtm9PLG.LR6x7wv77vwouGXoKssT7Xfk/rOsQZe',
      isAdmin: false,
      image: 'https://i.pravatar.cc/300',
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      Followers: [
        {
          id: 2,
          name: 'user1',
          email: 'user1@example.com',
          password:
            '$2a$10$s7ShjXk/VR4nVoFtm9PLG.LR6x7wv77vwouGXoKssT7Xfk/rOsQZe',
          isAdmin: false,
          image: 'https://i.pravatar.cc/300',
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Followship: {
            followerId: 2,
            followingId: 2,
            createdAt: '2020-03-25T07:52:27.000Z',
            updatedAt: '2020-03-25T07:52:27.000Z'
          }
        },
        {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password:
            '$2a$10$0dBI.8S//NhlGeouBUbV3.oBDkdbbqXObuMJyuS.PHxjzdW/PvqYy',
          isAdmin: true,
          image: 'https://i.pravatar.cc/300',
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Followship: {
            followerId: 1,
            followingId: 2,
            createdAt: '2020-11-18T07:59:46.000Z',
            updatedAt: '2020-11-18T07:59:46.000Z'
          }
        }
      ],
      FollowerCount: 2,
      isFollowed: true
    },
    {
      id: 3,
      name: 'user2',
      email: 'user2@example.com',
      password: '$2a$10$TPKFC8BS5/E37CFM3kx8yOPya6L5ifI0S8aFQ7b3jdA.oEzjXwYby',
      isAdmin: false,
      image: 'https://i.pravatar.cc/300',
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      Followers: [
        {
          id: 1,
          name: 'root',
          email: 'root@example.com',
          password:
            '$2a$10$0dBI.8S//NhlGeouBUbV3.oBDkdbbqXObuMJyuS.PHxjzdW/PvqYy',
          isAdmin: true,
          image: 'https://i.pravatar.cc/300',
          createdAt: '2020-11-23T10:08:45.000Z',
          updatedAt: '2020-11-23T10:08:45.000Z',
          Followship: {
            followerId: 1,
            followingId: 3,
            createdAt: '2020-11-18T08:00:08.000Z',
            updatedAt: '2020-11-18T08:00:08.000Z'
          }
        }
      ],
      FollowerCount: 1,
      isFollowed: true
    },
    {
      id: 1,
      name: 'root',
      email: 'root@example.com',
      password: '$2a$10$0dBI.8S//NhlGeouBUbV3.oBDkdbbqXObuMJyuS.PHxjzdW/PvqYy',
      isAdmin: true,
      image: 'https://i.pravatar.cc/300',
      createdAt: '2020-11-23T10:08:45.000Z',
      updatedAt: '2020-11-23T10:08:45.000Z',
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    },
    {
      id: 902,
      name: 'Serena',
      email: 'serena@gmail.com',
      password: '$2a$10$qh4WPjAiZsOxg2sCF2KEP.4P7p9kS6vAeTujIr3cZXfE3vaWVqUMO',
      isAdmin: false,
      image: 'https://i.pravatar.cc/300',
      createdAt: '2020-11-23T10:13:44.000Z',
      updatedAt: '2020-11-23T10:13:44.000Z',
      Followers: [],
      FollowerCount: 0,
      isFollowed: false
    }
  ]
}
export default {
  data () {
    return {
      users: []
    }
  },
  computed: {
    topUsers () {
      return this.users.filter(e => e.FollowerCount > 0).sort((a, b) => b.FollowerCount - a.FollowerCount)
    }
  },
  methods: {
    fetchUser () {
      this.users = dummyData.users
    }
  },
  created () {
    this.fetchUser()
  },
  components: {
    NavTabs,
    UserCard
  }
}
</script>
