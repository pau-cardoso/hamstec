import { AppDataSource } from "../data-source"
import { QuoteProduct } from "../entity/QuoteProduct"

export async function getAllQuoteProducts(request, response) {
  const quoteProducts = await AppDataSource.getRepository(QuoteProduct).find()
  response.json(quoteProducts)
};

export async function getQuoteProduct(request, response) {
  const results = await AppDataSource.getRepository(QuoteProduct).findOneBy({
    id: request.params.id,
  })
  return response.send(results)
}

export async function getProductsByQuote(request, response) {
  const products = await AppDataSource.getRepository(QuoteProduct).find({
    relations: {
      quote: true,
      section: true,
      product: true,
    },
    where: {
      quote: {
        id: request.params.id_quote,
      },
      phase: "COTIZACION",
    },
    order: {
      section: {
        id: "ASC"
      }
    }
  })

  const productResult = {};
  let currentSection = -1;
  products.forEach(product => {
    if (product.section.id !== currentSection) {
      currentSection = product.section.id;
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
