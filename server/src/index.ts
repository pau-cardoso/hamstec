import { AppDataSource } from "./data-source"

const express = require('express')
const bodyParser = require('body-parser');

const productRouter = require('./routes/product.js')
const quoteRouter = require('./routes/quote.js')
const projectRouter = require('./routes/project.js')

const app = express()
const port = 3000
AppDataSource.initialize()

app.use(bodyParser.json())

app.use('/product', productRouter);
app.use('/quote', quoteRouter);
app.use('/project', projectRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
