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
  const products = await AppDataSource.getRepository(QuoteProduct).find({
    relations: [
      "id_quote",
      "id_section",
      "id_product",
    ],
    where: {
      id_quote: request.params.id_quote,
      phase: "COTIZACION",
    },
    order: {
      id_section: {
        id_section: "ASC"
      }
    }
  })

  const productResult = {};
  let currentSection = -1;
  products.forEach(product => {
    if (product.id_section.id_section !== currentSection) {
      currentSection = product.id_section.id_section;
      productResult[currentSection] = []
    }
    productResult[currentSection].push(product);
  });

  return response.send(productResult);
}

export async function addQuoteProduct(request, response) {
  const quoteProduct = await AppDataSource.getRepository(QuoteProduct).create(request.body)
  const results = await AppDataSource.getRepository(QuoteProduct).save(quoteProduct)
  return response.send(results)
}
