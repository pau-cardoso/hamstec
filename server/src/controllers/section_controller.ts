import { AppDataSource } from "../data-source"
import { Section } from "../entity/Section";


export async function getAllSections(request, response) {
  try {
    const sections = await AppDataSource.getRepository(Section).find();
    response.json(sections);

  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function getSection(request, response) {
  try {
    const results = await AppDataSource.getRepository(Section).findOneBy({
      id: request.params.id,
    });
    return response.send(results);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addSection(request, response) {
  try {
    const section = await AppDataSource.getRepository(Section).create(request.body);
    const results = await AppDataSource.getRepository(Section).save(section);
    return response.send(results);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteSection(request, response) {
  try {
    const results = await AppDataSource.getRepository(Section).delete(request.params.id);
    return response.send(results);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateSection(request, response) {
  try {
    const section = await AppDataSource.getRepository(Section).findOneBy({
      id: request.params.id,
    });
    AppDataSource.getRepository(Section).merge(section, request.body);
    const results = await AppDataSource.getRepository(Section).save(section);
    return response.send(results);

  } catch (error) {
    console.log(error);
    response.status(500).send(error);
    return error;
  }
};