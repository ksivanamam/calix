module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      'openRoute': {
        target: 'http://localhost:1000/'
      },
      'protectedRoute': {
        target: 'http://localhost:2000/'
      }
    }
  }
}