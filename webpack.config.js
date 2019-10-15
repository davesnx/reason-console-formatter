const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = {
  entry: './index.js',
  output: { path: __dirname, filename: 'dist/bundle.js' },
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
    new WebpackShellPlugin({
      onBuildExit: ['node build.js']
    })
  ]
}
