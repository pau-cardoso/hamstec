import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

export async function getAllProducts(request, response) {
  const users = await AppDataSource.getRepository(Product).find({
    relations: {
      brand: true,
    }
  }).catch((error) => {
    console.log(error);
    return error;
  });
  response.json(users);
};

export async function getProduct(request, response) {
  const results = await AppDataSource.getRepository(Product).findOne({
    relations: {
      brand: true,
    },
    where: {
      id: request.params.id,
    }
  }).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function updateProduct(request, response) {
  try {
    const product = await AppDataSource.getRepository(Product).findOneBy({
      id: request.params.id,
    });
    AppDataSource.getRepository(Product).merge(product, request.body);
    const results = await AppDataSource.getRepository(Product).save(product);
    return response.send(results)
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addProduct(request, response) {
  const product = await AppDataSource.getRepository(Product).create(request.body)
  const results = await AppDataSource.getRepository(Product).save(product).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function deleteProduct(request, response) {
  const results = await AppDataSource.getRepository(Product).delete(request.params.id).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}