import { AppDataSource } from "./data-source"

const express = require('express')
const bodyParser = require('body-parser');

const productRouter = require('./routes/product.js')

const app = express()
const port = 3000
AppDataSource.initialize()

app.use(bodyParser.json())

app.use('/product', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
