import { AppDataSource } from "./data-source"
import { Product } from "./entity/Product"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.email = "pau@hamstec.com.mx"
    user.password = "pass"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.email)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

    const product = new Product()
    product.name = "Cerradura C1 WIFI"
    product.description = "C1 Cerradura WiFi"
    product.price = 4524.14
    product.utility = 3455.86
    product.installation = 0
    product.public_price = 7980.00
    await AppDataSource.manager.save(product)

}).catch(error => console.log(error))
