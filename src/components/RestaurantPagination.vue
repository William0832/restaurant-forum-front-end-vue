<template lang="pug">
nav(aria-label="page navigation")
  ul.pagination
    li.page-item(v-show="previousPage")
      router-link.page-link(
        :to="{name:'restaurants',  query: { categoryId, page: previousPage }}"
      )
        span(aria-hidden="true") &laquo;

    li.page-item(
      v-for="page in totalPage"
      :key="page"
      :class="{active: currentPage === page}"
    )
      router-link.page-link(
        :to="{name: 'restaurants', query: { categoryId, page }}"
      ) {{page}}

    li.page-item(v-show="nextPage")
      router-link.page-link(
        :to="{name:'restaurants',  query: { categoryId, page: nextPage }}"
      )
        span(aria-hidden="true") &raquo;
</template>

<script>
export default {
  props: {
    categoryId: {
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
    previousPage () {
      return this.currentPage <= 1 ? null : this.currentPage - 1
    },
    nextPage () {
      return this.currentPage >= this.totalPage ? null : this.currentPage + 1
    }
  }
}
</script>
