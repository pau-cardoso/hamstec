import { AppDataSource } from "../data-source"
import { Product } from "../entity/Product"

export async function getAllProducts(request, response) {
  const users = await AppDataSource.getRepository(Product).find()
  response.json(users)
};

export async function getProduct(request, response) {
  const results = await AppDataSource.getRepository(Product).findOneBy({
    id_product: request.params.id,
  })
  return response.send(results)
}