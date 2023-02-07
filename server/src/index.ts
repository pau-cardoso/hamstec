import { AppDataSource } from "./data-source"

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');
const { auth } = require('express-oauth2-jwt-bearer');

const brandRouter = require('./routes/brand.js')
const quoteRouter = require('./routes/quote.js')
const uploadRouter = require('./routes/upload.js')
const clientRouter = require('./routes/client.js')
const sectionRouter = require('./routes/section.js')
const projectRouter = require('./routes/project.js')
const productRouter = require('./routes/product.js')
const quoteProductRouter = require('./routes/quote_product.js')

const app = express()
const port = 3000
AppDataSource.initialize().catch((error) => console.log(error));

// const jwtCheck = auth({
//   audience: 'https://hamstec-api-endpoint',
//   issuerBaseURL: 'https://dev-2wwzzdwaumez74kc.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });

// // enforce on all endpoints
// app.use(jwtCheck);
app.use(bodyParser.json())
app.use(cors())

app.use('/brand', brandRouter);
app.use('/quote', quoteRouter);
app.use('/upload', uploadRouter);
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
