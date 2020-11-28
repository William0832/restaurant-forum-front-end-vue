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
      return src | 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}
