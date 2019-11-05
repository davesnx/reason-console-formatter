const ExtensionReloader = require('webpack-extension-reloader')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    'content-script': './src/content-script.js',
    devtool: './src/devtool.js'
  },
  output: {
    path: path.resolve(__dirname, 'extension')
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/env']
        }
      }
    ]
  },
  plugins: [
    new ExtensionReloader({
      entries: { contentScript: 'content-script' },
      reloadPage: true
    }),
    new CopyPlugin([
      {
        from: 'src',
        ignore: ['*.js', '**.spec.js']
      }
    ])
    // new WebpackShellPlugin({
    //   onBuildExit: ['node scripts/post-build.js']
    // })
  ]
}
