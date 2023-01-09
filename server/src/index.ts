import { AppDataSource } from "./data-source"

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');

const brandRouter = require('./routes/brand.js')
const quoteRouter = require('./routes/quote.js')
const clientRouter = require('./routes/client.js')
const sectionRouter = require('./routes/section.js')
const projectRouter = require('./routes/project.js')
const productRouter = require('./routes/product.js')
const quoteProductRouter = require('./routes/quote_product.js')

const app = express()
const port = 3000
AppDataSource.initialize().catch((error) => console.log(error));

app.use(bodyParser.json())
app.use(cors())

app.use('/brand', brandRouter);
app.use('/quote', quoteRouter);
app.use('/client', clientRouter);
app.use('/section', sectionRouter);
app.use('/product', productRouter);
app.use('/project', projectRouter);
app.use('/quote-product', quoteProductRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
