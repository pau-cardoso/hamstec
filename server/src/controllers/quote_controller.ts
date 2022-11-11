import { AppDataSource } from "../data-source"
import { Quote } from "../entity/Quote"
import { QuoteProduct } from "../entity/QuoteProduct"

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

export async function addQuote(request, response) {
  const lastQuote = await AppDataSource.getRepository(Quote).findOne({
    relations: {
      project: true,
    },
    where: {
      project: {
        id: request.params.project_id,
      },
    },
    order: {
      id: "DESC",
      version: "DESC",
    }
  });

  const newQuote = new Quote();
  newQuote.project = request.params.project_id;
  newQuote.version = lastQuote === null ? 1 : +lastQuote.version + 1;
  const addedQuote = await AppDataSource.getRepository(Quote).save(newQuote);


  if (lastQuote !== null) {
    const quoteProducts = await AppDataSource.getRepository(QuoteProduct).find({
      relations: {
        quote: true,
        product: true,
        section: true,
      },
      where: {
        quote: {
          id: lastQuote.id,
        },
        phase: 'COTIZACION'
      },
      select: {
        quantity: true,
        zone: true,
        observations: true,
        phase: true,
        voice: true,
      }
    });
    quoteProducts.forEach(product => {
      product.quote.id = addedQuote.id;
      product.quote.version = addedQuote.version;
    });

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(QuoteProduct)
      .values(quoteProducts)
      .execute();
  }

  return response.send(addedQuote)
}