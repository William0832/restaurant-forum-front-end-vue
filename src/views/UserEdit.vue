<template lang="pug">
.container.py-5(v-show="!isLoading")
  form(@submit.stop.prevent="submitHandler")
    .form-group
      label(for="name") Name
      input#name.form-control(
        v-model="profile.name"
        type="text"
        name="name"
        required
      )
    .form-group
      label(for="image") Image
      img.d-block.mb-4(
        width="100"
        height="100"
        v-if="profile.image"
        :src="profile.image"
      )
      input#image.form-control-file(
        @change="fileChangeHandler"
        type="file"
        name="image"
        accept="image/*"
      )
    button.btn.btn-primary(
      :disabled="isProcessing"
      type="submit"
      ) Submit

  button.btn.btn-link(
    type="button"
    @click="$router.back()"
  ) 回上一頁

</template>

<script>
import { fileChangeHandler } from '../utils/mixins'
import { mapState } from 'vuex'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
export default {
  computed: {
    ...mapState(['currentUser'])
  },
  mixins: [fileChangeHandler],
  data () {
    return {
      isProcessing: false,
      isLoading: true,
      paramsId: null,
      profile: {
        id: -1,
        name: '',
        image: ''
      }
    }
  },
  watch: {
    currentUser (nv) {
      this.paramsId = this.$route.params.id
      this.setUser()
    }
  },
  methods: {
    setUser (userId) {
      if (!this.currentUser.id) {
        return
      }
      if (+this.paramsId !== +this.currentUser.id) {
        return this.$router.push({ name: 'not-found' })
      }
      const { id, name, image } = this.currentUser
      this.profile = {
        id,
        name,
        image
      }
      this.isLoading = false
    },
    async submitHandler (e) {
      try {
        this.isProcessing = true
        const payload = new FormData(e.target)
        if (!this.profile.name) {
          Toast.fire({
            icon: 'warning',
            title: '姓名請勿空白'
          })
          this.profile.name = this.currentUser.name
          return
        }
        const userId = this.currentUser.id
        const { data } = await usersAPI.put({ userId, payload })
        if (status.status === 'error') throw new Error(data.message)
        Toast.fire({
          icon: 'success',
          title: '使用者資料已成功更新'
        })
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: '無法跟新使用者資料，請稍後'
        })
      }
    }
  }
}
</script>
