<template lang="pug">
ul.nav.nav-pills.mb-4
  li.nav-item
    router-link.nav-link(:to="{ name: 'restaurants' }") 全部
  li.nav-item(v-for="category in categories", :key="category.id")
    router-link.nav-link(
      :to="{ name: 'restaurants', query: { categoryId: category.id } }"
    ) {{ category.name }}
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      require: true
    }
  }

}
</script>

<style lang="sass" scoped>
.nav-pills
  display: flex
  align-items: center
  margin-bottom: 1rem !important
  & .nav-link
    margin-right: 7px
    margin-bottom: 7px
    padding: 5px 10px 3px
    color: #4d4d4d
    border: 1px solid #a1a1a1
    transition: none
  & .nav-link.active,
  & .show > .nav-link
    border-width: 2px
    border-color: #bd2333
    background-color: transparent
</style>
