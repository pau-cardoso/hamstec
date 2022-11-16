import { AppDataSource } from "../data-source"
import { Product } from "../entity/Product"

export async function getAllProducts(request, response) {
  const users = await AppDataSource.getRepository(Product).find({
    relations: {
      brand: true,
    }
  })
  response.json(users)
};

export async function getProduct(request, response) {
  const results = await AppDataSource.getRepository(Product).findOneBy({
    id: request.params.id,
  })
  return response.send(results)
}

export async function updateProduct(request, response) {
  const product = await AppDataSource.getRepository(Product).findOneBy({
    id: request.params.id,
  });
  AppDataSource.getRepository(Product).merge(product, request.body);
  const results = await AppDataSource.getRepository(Product).save(product);
  return response.send(results)
}

export async function addProduct(request, response) {
  const product = await AppDataSource.getRepository(Product).create(request.body)
  const results = await AppDataSource.getRepository(Product).save(product)
  return response.send(results)
}