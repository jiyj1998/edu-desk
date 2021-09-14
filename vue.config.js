const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }]
    }
  }
}
