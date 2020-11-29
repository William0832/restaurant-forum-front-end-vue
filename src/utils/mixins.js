import moment from 'moment'
export const fromNow = {
  methods: {
    fromNow (target) {
      return moment(target.createdAt).fromNow()
    }
  }
}
export const emptyImage = {
  methods: {
    emptyImage (src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}
export const fileChangeHandler = {
  methods: {
    fileChangeHandler (e) {
      const { files } = e.target
      const item = this.restaurant ? this.restaurant : this.profile
      if (files.length === 0) {
        item.image = ''
        return
      }
      const imageURL = window.URL.createObjectURL(files[0])
      item.image = imageURL
    }
  }
}
