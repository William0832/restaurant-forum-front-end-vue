<template lang="pug">
  .mb-3
    h1 餐廳後台
    router-link(:to="{name: 'admin-restaurants'}").mr-2 Restaurants
    span.mr-2 |
    router-link(:to="{name: 'admin-categories'}").mr-2 Categories
    span.mr-2 |
    router-link(:to="{name: 'admin-users'}") Users

</template>

<script>
export default {

}
</script>
