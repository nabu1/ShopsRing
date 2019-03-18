// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return

    return {
      plugins: [
        // new BundleAnalyzerPlugin({
        //   analyzerMode: 'server',
        //   generateStatsFile: true,
        //   mode: 'production',
        //   openAnalyzer: false
        // }),

      ]
    }
  }
}
