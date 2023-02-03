import { env } from "process"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Brand } from "./entity/Brand"
import { Client } from "./entity/Client"
import { Product } from "./entity/Product"
import { Project } from "./entity/Project"
import { Quote } from "./entity/Quote"
import { QuotePdf } from "./entity/QuotePdf"
import { QuoteProduct } from "./entity/QuoteProduct"
import { Section } from "./entity/Section"
import { User } from "./entity/User"

require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.HOST,
    port: +env.PORT,
    username: env.USERNAME,
    password: env.PASSWORD,
    database: env.DB,
    synchronize: true,
    logging: false,
    entities: [User, Product, Client, Project, Brand, Section, Quote, QuoteProduct, QuotePdf],
    migrations: [],
    subscribers: [],
})
