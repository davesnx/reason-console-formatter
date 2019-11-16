const WebpackShellPlugin = require('webpack-shell-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? '#inline-source-map' : '',
  entry: './src/load.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'extension'),
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src',
        ignore: ['*.js', '**.spec.js']
      }
    ]),
    new WebpackShellPlugin({
      onBuildExit: ['node scripts/post-build.js']
    })
  ]
}
