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