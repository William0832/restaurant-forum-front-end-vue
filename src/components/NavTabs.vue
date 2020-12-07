<template lang="pug">
ul.nav.nav-tabs.mb-4
  li.nav-item(v-for="tab in tabs", :key="tab.id")
    router-link.nav-link(:to="tab.path") {{ tab.title }}
</template>

<script>
import { v4 as uuid } from 'uuid'
export default {
  data () {
    return {
      tabs: [
        {
          id: uuid(),
          title: '首頁',
          path: '/restaurants'

        }, {
          id: uuid(),
          title: '最新動態',
          path: '/restaurants/feeds'

        }, {
          id: uuid(),
          title: '人氣餐廳',
          path: '/restaurants/top'

        }, {
          id: uuid(),
          title: '美食達人',
          path: '/users/top'

        }
      ]
    }
  }
}
</script>

<style  lang="sass" scoped>
.nav-tabs
  border-bottom: 1px solid #bd2333

  & .nav-link:focus,

  & .nav-link:hover,

  & .nav-item.show .nav-link,

  & .nav-link.active
    border-color: #bd2333
    background-color: #bd2333
    color: white
</style>
