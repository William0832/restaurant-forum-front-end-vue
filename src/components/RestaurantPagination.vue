<template lang="pug">
nav(aria-label="page navigation")
  ul.pagination
    li.page-item(v-show="previousPage")
      router-link.page-link(
        :to="{ name: 'restaurants', query: { categoryId, page: previousPage } }"
      )
        span(aria-hidden="true") &laquo;
    li.page-item(
      v-for="page in totalPage",
      :key="page",
      :class="{ active: currentPage === page }"
    )
      router-link.page-link(
        :to="{ name: 'restaurants', query: { categoryId, page } }"
      ) {{ page }}
    li.page-item(v-show="nextPage")
      router-link.page-link(
        :to="{ name: 'restaurants', query: { categoryId, page: nextPage } }"
      )
        span(aria-hidden="true") &raquo;
</template>

<script>
export default {
  props: {
    InitCategoryId: {
      type: Number,
      default: undefined
    },
    currentPage: {
      type: Number,
      default: undefined
    },
    totalPage: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    categoryId () {
      return this.InitCategoryId === 0 ? '' : this.InitCategoryId
    },
    previousPage () {
      return this.currentPage <= 1 ? null : this.currentPage - 1
    },
    nextPage () {
      return this.currentPage >= this.totalPage ? null : this.currentPage + 1
    }
  }
}
</script>

</script>

<style scoped lang="sass">
.pagination
  display: flex
  justify-content: center
  margin-top: 20px

.page-link
  height: 37px
  padding: 7px 20px
  color: #bd2333

.page-item.active .page-link,
.page-item.active span
  color: white
  background-color: #bd2333
  border-color: #bd2333
  z-index: 1

.page-item span
  color: #bd2333

a.page-link:hover,
a.page-link:hover span
  color: white
  background-color: #bd2333
  border-color: #bd2333
</style>
