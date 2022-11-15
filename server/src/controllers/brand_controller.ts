import { AppDataSource } from "../data-source"
import { Brand } from "../entity/Brand";


export async function getAllBrands(request, response) {
  const brands = await AppDataSource.getRepository(Brand).find();

  response.json(brands)
};

export async function getBrand(request, response) {
  const results = await AppDataSource.getRepository(Brand).findOneBy({
    id: request.params.id,
  })
  return response.send(results)
}

// TODO: Test it
export async function addBrand(request, response) {
  const brand = await AppDataSource.getRepository(Brand).create(request.body)
  const results = await AppDataSource.getRepository(Brand).save(brand)
  return response.send(results)
}