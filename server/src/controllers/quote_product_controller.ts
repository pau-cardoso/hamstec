import { AppDataSource } from "../data-source"
import { Quote } from "../entity/Quote"
import { QuoteProduct } from "../entity/QuoteProduct"

async function getExpenses(idQuote) {
  const quoteSummary = await AppDataSource.getRepository(QuoteProduct)
    .createQueryBuilder("quoteProduct")
    .leftJoin('quoteProduct.quote', 'quote')
    .leftJoin('quoteProduct.product', 'product')
    .where('quoteProduct.quote = :id_quote', { id_quote: idQuote })
    .andWhere('quoteProduct.phase = :phase', { phase: 'COTIZACION' })
    .andWhere('product.id IS NOT NULL')
    .select('CAST(AVG(CAST(product.public_price AS decimal) * quoteProduct.quantity) * 6 AS MONEY)', 'viaticos')
    .getRawOne().catch((error) => console.log(error));
  return quoteSummary.viaticos;
}

async function updateExpenses(idQuote) {
  try {
    const quoteRepository = await AppDataSource.getRepository(Quote);
    const quote = await quoteRepository.findOneBy({id: idQuote});
    const expenses = await getExpenses(quote.id);
    quote.expenses = expenses === null ? 0 : expenses;
    await quoteRepository.save(quote);

  } catch (error) {
    console.log(error);
  }
}

export async function getAllQuoteProducts(request, response) {
  try {
    const quoteProducts = await AppDataSource.getRepository(QuoteProduct).find()
    response.json(quoteProducts)
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function getQuoteProduct(request, response) {
  try {
    const results = await AppDataSource.getRepository(QuoteProduct).findOne({
      where: {
        id: request.params.id,
      },
      relations: {
        product: true,
        section: true,
      }
    });
    return response.send(results);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getProductsByQuote(request, response) {
  try {
    const quoteSummary = await AppDataSource.getRepository(QuoteProduct)
      .createQueryBuilder("quoteProduct")
      .leftJoin('quoteProduct.quote', 'quote')
      .leftJoin('quoteProduct.product', 'product')
      .where('quoteProduct.quote = :id_quote', { id_quote: request.params.id_quote })
      .andWhere('quoteProduct.phase = :phase', { phase: 'COTIZACION' })
      .groupBy('quote.expenses')
      .addGroupBy('quote.discount')
      .addGroupBy('quote.advance')
      .select('SUM(product.price)', 'cost')
      .addSelect('SUM(product.installation)', 'installation')
      .addSelect('SUM(product.utility)', 'utility')
      .addSelect('quote.expenses', 'expenses')
      .addSelect('quote.advance', 'advance')
      .addSelect('SUM(product.public_price * quoteProduct.quantity) + quote.expenses - quote.discount', 'total')
      .addSelect('((SUM(product.public_price * quoteProduct.quantity) + quote.expenses - quote.discount) * quote.advance)/100', 'anticipo')
      .addSelect('((SUM(product.public_price * quoteProduct.quantity) + quote.expenses - quote.discount) * (100 - quote.advance))/100', 'instalacion')
      .getRawOne();

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
      },
    });

    const productResult = {};
    let currentSection = -1;
    products.forEach(product => {
      if (product.section.id !== currentSection) {
        currentSection = product.section.id;
        productResult[currentSection] = []
      }
      productResult[currentSection].push(product);
    });

    const newResults = [];
    for (let key in productResult) {
      const section = {
        name: productResult[key][0].section.name,
        id: productResult[key][0].section.id,
        data: productResult[key]
      }
      newResults.push(section);
    }

    return response.send([newResults, quoteSummary]);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getProductsInstalledByQuote(request, response) {
  try {
    const quoteProducts = await AppDataSource.getRepository(QuoteProduct).find({
      relations: {
        quote: true,
        section: true,
        product: true,
      },
      where: {
        quote: {
          id: request.params.id_quote,
        },
        phase: "INSTALACION",
      },
      order: {
        section: {
          id: "ASC"
        }
      },
    });

    const productResult = {};
    let currentSection = -1;
    quoteProducts.forEach(product => {
      if (product.section.id !== currentSection) {
        currentSection = product.section.id;
        productResult[currentSection] = [];
      }
      productResult[currentSection].push(product);
    });

    const newResults = [];
    for (let key in productResult) {
      const section = {
        name: productResult[key][0].section.name,
        id: productResult[key][0].section.id,
        data: productResult[key]
      }
      newResults.push(section);
    }

    return response.send(newResults);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addQuoteProduct(request, response) {
  try {
    const quoteProduct = await AppDataSource.getRepository(QuoteProduct).create(request.body);
    const results = await AppDataSource.getRepository(QuoteProduct).save(quoteProduct);
    if (request.body.phase === 'COTIZACION') {
      await updateExpenses(request.body.quote);
    }
    return response.send(results);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getProductCount(request, response) {
  try {
    const countProducts = await AppDataSource.getRepository(QuoteProduct)
      .createQueryBuilder("quoteProduct")
      .leftJoin('quoteProduct.product', 'product')
      .leftJoin('product.brand', 'brand')
      .where('quoteProduct.quote = :id_quote', { id_quote: request.params.id_quote })
      .andWhere('product.id IS NOT NULL')
      .groupBy("product.id")
      .addGroupBy("quoteProduct.phase")
      .addGroupBy("brand.name")
      .orderBy("product.id")
      .select('COUNT(product.id)', 'product_count')
      .addSelect('product.id')
      .addSelect('product.name')
      .addSelect('product.code')
      .addSelect('product.brand')
      .addSelect('product.public_price')
      .addSelect('brand.name')
      .addSelect('quoteProduct.phase')
      .getRawMany();

    const productResult = {};
    let currentProduct = -1;
    countProducts.forEach(product => {
      if (product.product_id !== currentProduct) {
        currentProduct = product.product_id;
        productResult[currentProduct] = []
      }
      productResult[currentProduct].push(product);
    });

    return response.send(productResult);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateProduct(request, response) {
  try {
    const quoteProduct = await AppDataSource.getRepository(QuoteProduct).findOneBy({
      id: request.params.id,
    });
    AppDataSource.getRepository(QuoteProduct).merge(quoteProduct, request.body);
    const results = await AppDataSource.getRepository(QuoteProduct).save(quoteProduct);
    if (request.body.phase === 'COTIZACION') {
      await updateExpenses(request.body.quote);
    }
    return response.send(results);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteProduct(request, response) {
  try {
    const quote = await AppDataSource.getRepository(QuoteProduct).findOne({
      where: {
        id: request.params.id,
      },
      relations: {
        quote: true,
      },
      select: {
        quote: {
          id: true,
        },
      }
    });
    const results = await AppDataSource.getRepository(QuoteProduct).delete(request.params.id);

    if (quote.phase === 'COTIZACION') {
      await updateExpenses(quote.quote.id);
    };

    return response.send(results);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteSection(request, response) {
  try {
    const results = await AppDataSource.getRepository(QuoteProduct).delete({
      quote: {
        id: request.params.id_quote,
      },
      section: {
        id: request.body.section,
      },
      phase: request.body.phase,
    });

    if (request.body.phase === 'COTIZACION') {
      await updateExpenses(request.params.id_quote);
    };

    return response.send(results);

  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getQuoteProductsByType(idQuote, phase) {
  try {
    const quoteProducts = await AppDataSource.getRepository(QuoteProduct).find({
      relations: {
        quote: true,
        section: true,
        product: true,
      },
      where: {
        quote: {
          id: idQuote,
        },
        phase: phase,
      },
      order: {
        section: {
          id: "ASC"
        }
      },
    });
    return quoteProducts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getQuoteTabInformation(idQuote) {
  try {
    const quoteSummary = await AppDataSource.getRepository(QuoteProduct)
      .createQueryBuilder("quoteProduct")
      .leftJoin('quoteProduct.quote', 'quote')
      .leftJoin('quoteProduct.product', 'product')
      .where('quoteProduct.quote = :id_quote', { id_quote: idQuote })
      .andWhere('quoteProduct.phase = :phase', { phase: 'COTIZACION' })
      .groupBy('quote.expenses')
      .addGroupBy('quote.discount')
      .addGroupBy('quote.advance')
      .select('SUM(product.price)', 'cost')
      .addSelect('SUM(product.installation)', 'installation')
      .addSelect('SUM(product.utility)', 'utility')
      .addSelect('quote.expenses', 'expenses')
      .addSelect('quote.advance', 'advance')
      .addSelect('SUM(product.public_price * quoteProduct.quantity) + quote.expenses - quote.discount', 'total')
      .addSelect('((SUM(product.public_price * quoteProduct.quantity) + quote.expenses - quote.discount) * quote.advance)/100', 'anticipo')
      .addSelect('((SUM(product.public_price * quoteProduct.quantity) + quote.expenses - quote.discount) * (100 - quote.advance))/100', 'instalacion')
      .getRawOne();

    const products = await getQuoteProductsByType(idQuote, 'COTIZACION');

    const productResult = {};
    let currentSection = -1;
    products.forEach(product => {
      if (product.section.id !== currentSection) {
        currentSection = product.section.id;
        productResult[currentSection] = []
      }
      productResult[currentSection].push(product);
    });

    const newResults = [];
    for (let key in productResult) {
      const section = {
        name: productResult[key][0].section.name,
        id: productResult[key][0].section.id,
        data: productResult[key]
      }
      newResults.push(section);
    }

    return [newResults, quoteSummary];
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getInstallationTabInformation(idQuote) {
  try {
    const products = await getQuoteProductsByType(idQuote, 'INSTALACION');

    const productResult = {};
    let currentSection = -1;
    products.forEach(product => {
      if (product.section.id !== currentSection) {
        currentSection = product.section.id;
        productResult[currentSection] = [];
      }
      productResult[currentSection].push(product);
    });

    const newResults = [];
    for (let key in productResult) {
      const section = {
        name: productResult[key][0].section.name,
        id: productResult[key][0].section.id,
        data: productResult[key]
      }
      newResults.push(section);
    }

    return newResults;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getDeviceSummaryTabInformation(idQuote) {
  try {
    const countProducts = await AppDataSource.getRepository(QuoteProduct)
      .createQueryBuilder("quoteProduct")
      .leftJoin('quoteProduct.product', 'product')
      .leftJoin('product.brand', 'brand')
      .where('quoteProduct.quote = :id_quote', { id_quote: idQuote })
      .andWhere('product.id IS NOT NULL')
      .groupBy("product.id")
      .addGroupBy("quoteProduct.phase")
      .addGroupBy("brand.name")
      .orderBy("product.id")
      .select('COUNT(product.id)', 'product_count')
      .addSelect('product.id')
      .addSelect('product.name')
      .addSelect('product.code')
      .addSelect('product.brand')
      .addSelect('product.public_price')
      .addSelect('brand.name')
      .addSelect('quoteProduct.phase')
      .getRawMany();

    const productResult = {};
    let currentProduct = -1;
    countProducts.forEach(product => {
      if (product.product_id !== currentProduct) {
        currentProduct = product.product_id;
        productResult[currentProduct] = []
      }
      productResult[currentProduct].push(product);
    });

    return Object.values(productResult);
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getTabsInformationByQuote(idQuote) {
  try {
    const quoteTab = await getQuoteTabInformation(idQuote);
    const installationTab = await getInstallationTabInformation(idQuote);
    const devicesTab = await getDeviceSummaryTabInformation(idQuote);

    return {
      id: idQuote,
      cotizacion: quoteTab,
      instalacion: installationTab,
      resumen: devicesTab
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function getQuotesInformationByProject(request, response) {
  try {
    const quotes = await AppDataSource.getRepository(Quote).find({
      relations: {
        project: true,
      },
      where: {
        project: {
          id: request.params.id_project,
        },
      },
      order: {
        authorized: 'DESC',
        version: "DESC"
      }
    });

    const result = [];
    for (let i = 0; i < quotes.length; i++) {
      const info = await getTabsInformationByQuote(quotes[i].id);
      result.push(info);
    }

    return response.send(result);
  } catch (error) {
    console.log(error);
    return error;
  }
}