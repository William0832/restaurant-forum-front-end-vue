module.export = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/restaurant-forum-front-end-vue'
    : '/'
}
