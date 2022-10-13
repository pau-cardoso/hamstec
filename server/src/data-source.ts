import "reflect-metadata"
import { DataSource } from "typeorm"
import { Brand } from "./entity/Brand"
import { Client } from "./entity/Client"
import { Product } from "./entity/Product"
import { Project } from "./entity/Project"
import { Quote } from "./entity/Quote"
import { Section } from "./entity/Section"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pau1feb",
    database: "hamstec",
    synchronize: true,
    logging: false,
    entities: [User, Product, Client, Project, Brand, Section, Quote],
    migrations: [],
    subscribers: [],
})
