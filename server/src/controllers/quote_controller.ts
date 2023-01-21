import { AppDataSource } from "../data-source";
import { Quote } from "../entity/Quote";
import { QuoteProduct } from "../entity/QuoteProduct";

export async function getAllQuotes(request, response) {
  const quotes = await AppDataSource.getRepository(Quote).find({
    relations: {
      project: true,
    }
  }).catch((error) => {
    console.log(error);
    return error;
  });
  response.json(quotes);
};

export async function getQuote(request, response) {
  const results = await AppDataSource.getRepository(Quote).findOneBy({
    id: request.params.id,
  }).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
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
  }).catch((error) => {
    console.log(error);
    return error;
  });

  return response.send(results);
}

export async function addQuote(request, response) {
  try {
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
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function cloneQuote(request, response) {
  try {
    const lastVersion = (await AppDataSource.getRepository(Quote).findOne({
      relations: {
        project: true,
      },
      where: {
        project: {
          id: request.body.projectId,
        },
      },
      order: {
        id: "DESC",
        version: "DESC",
      }
    })).version;

    const cloningQuote = await AppDataSource.getRepository(Quote).findOne({
      relations: {
        project: true,
      },
      where: {
        id: request.params.quote_id,
      },
    });

    const newQuote = new Quote();
    newQuote.project = request.body.projectId;
    newQuote.version = +lastVersion + 1;
    const addedQuote = await AppDataSource.getRepository(Quote).save(newQuote);

    // Cloning all quote products from the quote to clone
    const quoteProducts = await AppDataSource.getRepository(QuoteProduct).find({
      relations: {
        quote: true,
        product: true,
        section: true,
      },
      where: {
        quote: {
          id: cloningQuote.id,
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

    return response.send(addedQuote)
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateQuote(request, response) {
  try {
    const quote = await AppDataSource.getRepository(Quote).findOneBy({
      id: request.params.id,
    });
    AppDataSource.getRepository(Quote).merge(quote, request.body);
    const results = await AppDataSource.getRepository(Quote).save(quote);
    return response.send(results);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteQuote(request, response) {
  const results = await AppDataSource.getRepository(Quote).delete(request.params.id).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}