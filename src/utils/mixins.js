import moment from 'moment'
export default {
  methods: {
    fromNow (target) {
      return moment(target.createdAt).fromNow()
    }
  }
}
