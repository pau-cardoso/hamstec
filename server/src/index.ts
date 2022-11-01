import { AppDataSource } from "./data-source"

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const productRouter = require('./routes/product.js')
const quoteRouter = require('./routes/quote.js')
const clientRouter = require('./routes/client.js')
const projectRouter = require('./routes/project.js')
const quoteProductRouter = require('./routes/quote_product.js')

const app = express()
const port = 3000
AppDataSource.initialize()

app.use(bodyParser.json())
app.use(cors())

app.use('/client', clientRouter);
app.use('/product', productRouter);
app.use('/quote', quoteRouter);
app.use('/project', projectRouter);
app.use('/quote-product', quoteProductRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
