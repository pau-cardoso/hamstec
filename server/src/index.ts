import { AppDataSource } from "./data-source"
import { Product } from "./entity/Product"
import { User } from "./entity/User"

const express = require('express')
const app = express()
const port = 3000

AppDataSource.initialize()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
