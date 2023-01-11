import { AppDataSource } from "../data-source";
import { Brand } from "../entity/Brand";


export async function getAllBrands(request, response) {
  const brands = await AppDataSource.getRepository(Brand).find().catch((error) => {
    console.log(error);
    return error;
  });;

  response.json(brands);
};

export async function getBrand(request, response) {
  const results = await AppDataSource.getRepository(Brand).findOneBy({
    id: request.params.id,
  }).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function addBrand(request, response) {
  const brand = await AppDataSource.getRepository(Brand).create(request.body)
  const results = await AppDataSource.getRepository(Brand).save(brand).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function deleteBrand(request, response) {
  const results = await AppDataSource.getRepository(Brand).delete(request.params.id).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function updateBrand(request, response) {
  try {
    const brand = await AppDataSource.getRepository(Brand).findOneBy({
      id: request.params.id,
    });
    AppDataSource.getRepository(Brand).merge(brand, request.body);
    const results = await AppDataSource.getRepository(Brand).save(brand);
    return response.send(results);

  } catch (error) {
    console.log(error);
    response.status(500).send(error);
    return error;
  }
};