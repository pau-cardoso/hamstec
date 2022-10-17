import { AppDataSource } from "../data-source"
import { QuoteProduct } from "../entity/QuoteProduct"

export async function getAllQuoteProducts(request, response) {
  const quoteProducts = await AppDataSource.getRepository(QuoteProduct).find()
  response.json(quoteProducts)
};

export async function getQuoteProduct(request, response) {
  const results = await AppDataSource.getRepository(QuoteProduct).findOneBy({
    id_quote_product: request.params.id,
  })
  return response.send(results)
}

export async function getProductsByQuote(request, response) {
  const results = await AppDataSource.getRepository(QuoteProduct).findOneBy({
    id_quote: request.params.id_quote,
  })
  return response.send(results)
}