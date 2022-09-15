/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.dev.js')
const path = require('path')
const cors = require('cors')
const { shoppingItemsRouter } = require('./backendRoutes/shoppingitems.js')
// const request = require('request')
const app = express()
app.use(cors())
const compiler = webpack(config)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const middleWare = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  // historyApiFallback: true,
})
app.use(middleWare)

// hot module replacement
app.use(
  require('webpack-hot-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  })
)

app.use('/api/shoppingitems', shoppingItemsRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

// Serve the files on port 3002.
app.listen(3005, () => {
  console.log('Example app listening on port 3005!\n')
})
