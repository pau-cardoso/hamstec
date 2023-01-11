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
  try {
    const project = await AppDataSource.getRepository(Project).create(request.body);
    const results = await AppDataSource.getRepository(Project).save(project);
    return response.send(results);

  } catch (error) {
    console.log(error);
    response.status(500).send(error);
    return error;
  }
}

export async function deleteProject(request, response) {
  const results = await AppDataSource.getRepository(Project).delete(request.params.id).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function updateProject(request, response) {
  try {
    const project = await AppDataSource.getRepository(Project).findOneBy({
      id: request.params.id,
    });
    AppDataSource.getRepository(Project).merge(project, request.body);
    const results = await AppDataSource.getRepository(Project).save(project);
    return response.send(results);

  } catch (error) {
    console.log(error);
    response.status(500).send(error);
    return error;
  }
};