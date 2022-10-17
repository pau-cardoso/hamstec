import { AppDataSource } from "../data-source"
import { Project } from "../entity/Project"

export async function getAllProjects(request, response) {
  const projects = await AppDataSource.getRepository(Project).find()
  response.json(projects)
};

export async function getProject(request, response) {
  const results = await AppDataSource.getRepository(Project).findOneBy({
    id_project: request.params.id,
  })
  return response.send(results)
}