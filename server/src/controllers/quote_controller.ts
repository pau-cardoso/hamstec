import { AppDataSource } from "../data-source"
import { Quote } from "../entity/Quote"

export async function getAllQuotes(request, response) {
  const quotes = await AppDataSource.getRepository(Quote).find()
  response.json(quotes)
};

export async function getQuote(request, response) {
  const results = await AppDataSource.getRepository(Quote).findOneBy({
    id_quote: request.params.id,
  })
  return response.send(results)
}

export async function getQuoteByProject(request, response) {
  const results = await AppDataSource.getRepository(Quote)
    .createQueryBuilder("quote")
    .innerJoinAndSelect(
      "quote.project",
      "project",
      "project.id_project = :project_id",
      {project_id: request.params.project_id})
    .select("quote")
    .getMany()
  return response.send(results)
}