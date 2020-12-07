<template lang="pug">
.mb-3
  h1 餐廳後台
  router-link.mr-2(:to="{ name: 'admin-restaurants' }") Restaurants
  span.mr-2 |
  router-link.mr-2(:to="{ name: 'admin-categories' }") Categories
  span.mr-2 |
  router-link(:to="{ name: 'admin-users' }") Users
</template>

<script>
export default {

}
</script>
