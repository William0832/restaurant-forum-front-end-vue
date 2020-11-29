<template lang="pug">
.container.py-5
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
    button.btn.btn-primary(type="submit") Submit
</template>

<script>
import { fileChangeHandler } from '../utils/mixins'
const dummyData = {
  profile: {
    id: 1,
    name: 'root',
    image: 'https://i.imgur.com/58ImzMM.png'
  }
}
export default {
  mixins: [fileChangeHandler],
  data () {
    return {
      profile: {
        id: -1,
        name: '',
        image: ''
      }
    }
  },
  methods: {
    fetchProfile (userId) {
      console.log('userId:', userId)
      const { id, name, image } = dummyData.profile
      this.profile = {
        id,
        name,
        image
      }
    },
    submitHandler (e) {
      // TODO: call api to edit user
      const formData = new FormData(e.target)
      for (const [k, v] of formData.entries()) {
        console.log(k, ':', v)
      }
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchProfile(userId)
  }
}
</script>
