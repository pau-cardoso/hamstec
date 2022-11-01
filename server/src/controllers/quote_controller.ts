import { AppDataSource } from "../data-source"
import { Quote } from "../entity/Quote"

export async function getAllQuotes(request, response) {
  const quotes = await AppDataSource.getRepository(Quote).find()
  response.json(quotes)
};

export async function getQuote(request, response) {
  const results = await AppDataSource.getRepository(Quote).findOneBy({
    id: request.params.id,
  })
  return response.send(results)
}

export async function getQuoteByProject(request, response) {
  const results = await AppDataSource.getRepository(Quote).find({
    relations: {
      project: true,
    },
    where: {
      project: {
        id: request.params.project_id,
      },
    },
    order: {
      version: "DESC"
    }
  });

  return response.send(results)
}