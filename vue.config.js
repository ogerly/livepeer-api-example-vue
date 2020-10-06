const webpack = require("webpack");

module.exports = {
  devServer: {
    proxy: process.env.VUE_APP_DEV_PROXY_SERVER
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery"
      })
    ]
  }
};