/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx$|\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { implementation: require('sass') }, // eslint-disable-line global-require
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      Components: path.resolve(__dirname, 'src/Components'),
      scss: path.resolve(__dirname, 'src/scss'),
    },
  },
  plugins: [
    // new webpack.NormalModuleReplacementPlugin(/debug/, `${process.cwd()}/support/noop.js`),
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html',
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
}
