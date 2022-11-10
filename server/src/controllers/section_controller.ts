import { AppDataSource } from "../data-source"
import { Section } from "../entity/Section";


export async function getAllSections(request, response) {
  const sections = await AppDataSource.getRepository(Section).find();

  response.json(sections)
};

export async function getSection(request, response) {
  const results = await AppDataSource.getRepository(Section).findOneBy({
    id: request.params.id,
  })
  return response.send(results)
}

// TODO: Test it
export async function addSection(request, response) {
  const section = await AppDataSource.getRepository(Section).create(request.body)
  const results = await AppDataSource.getRepository(Section).save(section)
  return response.send(results)
}