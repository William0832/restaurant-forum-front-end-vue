<template lang="pug">
.card.mb-3
  .row.no-gutters
    .col-md-4
      img(
        width="300"
        height="300"
        :src="profile.image"
        alt="img")
    .col-md-8
      .card-body
        h5.card-title {{profile.name}}
        p.card-text {{profile.email}}
        ul.list-unstyled.list-inline
          li
            strong {{commendRestaurantsAmount}}
            |  已評論餐廳
          li
            strong {{profile.FavoritedRestaurants.length}}
            |  收藏的餐廳
          li
            strong {{profile.Followings.length}}
            |  followings (追蹤者)
          li
            strong {{profile.Followers.length}}
            |  followers (追隨者)
        button.btn.btn-info(
          type="button"
          v-if="currentUser.id === profile.id"
        ) edit
        .btns(v-else)
          button.btn.btn-danger(
            v-if="isFollower"
            @click="toggleFollowing"
            type="button") 取消追蹤
          button.btn.btn-primary(
            v-else
            @click="toggleFollowing"
            type="button") 追蹤

</template>

<script>
export default {
  props: {
    initProfile: {
      type: Object,
      require: true
    },
    currentUser: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      profile: this.initProfile
    }
  },
  computed: {
    commendRestaurantsAmount () {
      const result = new Set()
      this.profile.Comments.forEach(e => {
        result.add(e.Restaurant.id)
      })
      return result.size
    },
    isFollower () {
      return this.profile.Followers.map(e => e.id).includes(this.currentUser.id)
    }
  },
  methods: {
    toggleFollowing () {
      console.log('isFollower', this.isFollower)
      if (this.isFollower) {
        // TODO: delete follow by API
        this.profile.Followers = this.profile.Followers.filter(e => e.id !== this.currentUser.id)
      } else {
        // TODO: add follow by API
        this.profile.Followers.push({ id: this.currentUser.id })
      }
    }
  }

}
</script>
