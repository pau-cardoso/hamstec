import { AppDataSource } from "../data-source"
import { Client } from "../entity/Client"
import { Project } from "../entity/Project"

export async function getAllProjects(request, response) {
  const projects = await AppDataSource.getRepository(Project)
    .createQueryBuilder("project")
    .innerJoinAndSelect("project.client", "client")
    .select("project.id_project")
    .addSelect("project.name")
    .addSelect("client.id_client")
    .addSelect("client.name")
    .getMany()
  response.json(projects)
};

export async function getProject(request, response) {
  const results = await AppDataSource.getRepository(Project).findOneBy({
    id_project: request.params.id,
  })
  return response.send(results)
}