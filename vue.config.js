module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:2333',
        changeOrigin: true
      },
    }
  }
};