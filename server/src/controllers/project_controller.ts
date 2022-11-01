import { AppDataSource } from "../data-source"
import { Client } from "../entity/Client"
import { Project } from "../entity/Project"

export async function getAllProjects(request, response) {
  const projects = await AppDataSource.getRepository(Project)
    .createQueryBuilder("project")
    .innerJoinAndSelect("project.client", "client")
    .select("project.id")
    .addSelect("project.name")
    .addSelect("client.id")
    .addSelect("client.name")
    .getMany()
  response.json(projects)
};

export async function getProject(request, response) {
  const results = await AppDataSource.getRepository(Project).findOneBy({
    id: request.params.id,
  })
  return response.send(results)
}

export async function addProject(request, response) {
  const project = await AppDataSource.getRepository(Project).create(request.body)
  const results = await AppDataSource.getRepository(Project).save(project)
  return response.send(results)
}