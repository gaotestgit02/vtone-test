/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const router = express.Router()

function guid() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

// const testItem = {
//   id: 0,
//   description: 'Get Tomatoes',
//   name: 'Tomatoes',
//   purchased: false,
//   quantity: 2,
// }

const items = []

router.get('/', (req, res) => {
  res.json(items)
})

router.post('/', (req, res) => {
  const item = {
    ...req.body,
  }
  item.id = guid()
  items.push(item)
  res.json(item)
})

router.delete('/:id', (req, res) => {
  items.splice(
    items.findIndex((item) => item.id === req.params.id),
    1
  )
  res.sendStatus(200)
})

router.put('/:id', (req, res) => {
  items.splice(
    items.findIndex((item) => item.id === req.params.id),
    1,
    req.body
  )
  res.sendStatus(200)
})

module.exports = {
  shoppingItemsRouter: router,
}
