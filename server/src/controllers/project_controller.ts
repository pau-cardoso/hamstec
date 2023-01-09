import { AppDataSource } from "../data-source";
import { Project } from "../entity/Project";

export async function getAllProjects(request, response) {
  const projects = await AppDataSource.getRepository(Project).find({
    relations: {
      client: true,
    },
    order: {
      id: "ASC"
    }
  }).catch((error) => {
    console.log(error);
    return error;
  });

  response.json(projects);
};

export async function getProject(request, response) {
  const results = await AppDataSource.getRepository(Project).findOne({
    relations: {
      client: true,
    },
    where: {
      id: request.params.id,
    },
  }).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function addProject(request, response) {
  const project = await AppDataSource.getRepository(Project).create(request.body);
  const results = await AppDataSource.getRepository(Project).save(project).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function deleteProject(request, response) {
  const results = await AppDataSource.getRepository(Project).delete(request.params.id).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}