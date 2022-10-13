import { AppDataSource } from "./data-source"
import { Product } from "./entity/Product"
import { User } from "./entity/User"
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 3000
AppDataSource.initialize()

app.use(bodyParser.json())

// app.get('/user', async (req, res) => {
//   const data = req.body
//   console.log("data", data)
//   try {
//     const result = await AppDataSource
//       .getRepository(User)
//       .findOneOrFail({
//         where: {id_user: data}
//       })
//       res.send(result)
//       return result;
//     }
//     catch (error) {
//       console.log(error);
//     }
// })


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
