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

// TODO: add vehicle cost and update total and utility with it
export async function getProductsByQuote(request, response) {
  const quoteSummary = await AppDataSource.getRepository(QuoteProduct)
    .createQueryBuilder("quoteProduct")
    .leftJoin('quoteProduct.quote', 'quote')
    .leftJoin('quoteProduct.product', 'product')
    .where('quoteProduct.quote = :id_quote', { id_quote: request.params.id_quote })
    .andWhere('quoteProduct.phase = :phase', { phase: 'COTIZACION' })
    .select('SUM(product.price)', 'cost')
    .addSelect('SUM(product.installation)', 'installation')
    .addSelect('SUM(product.utility)', 'utility')
    .addSelect('CAST(AVG(CAST(product.public_price AS decimal) * quoteProduct.quantity) * 6 AS MONEY)', 'viaticos')
    .addSelect('SUM(product.public_price * quoteProduct.quantity)', 'total')
    .addSelect('SUM(product.public_price * quoteProduct.quantity) * 0.8', 'anticipo')
    .addSelect('SUM(product.public_price * quoteProduct.quantity) * 0.2', 'instalacion')
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
    }
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

  const result = [productResult, quoteSummary];

  return response.send(result);
}

export async function getProductsInstalledByQuote(request, response) {
  const results = await AppDataSource.getRepository(QuoteProduct).find({
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
    }
  });

  const productResult = {};
  let currentSection = -1;
  results.forEach(product => {
    if (product.section.id !== currentSection) {
      currentSection = product.section.id;
      productResult[currentSection] = []
    }
    productResult[currentSection].push(product);
  });

  return response.send(productResult)
}

export async function addQuoteProduct(request, response) {
  const quoteProduct = await AppDataSource.getRepository(QuoteProduct).create(request.body)
  const results = await AppDataSource.getRepository(QuoteProduct).save(quoteProduct)
  return response.send(results)
}

export async function getProductCount(request, response) {
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
}