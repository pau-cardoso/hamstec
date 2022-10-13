import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"
import { Quote } from "./Quote"
import { Section } from "./Section"

/**
 * Entidad que refleja la relación
 * entre Cotización y Productos
 * Registra los productos agregados en una cotización
 */
@Entity()
export class QuoteProduct {

  @PrimaryGeneratedColumn()
  id_quote_product: number

  @ManyToOne(() => Product, (product) => product.id_product)
  id_product: Product

  @ManyToOne(() => Quote, (quote) => quote.id_quote)
  id_quote: Quote

  @ManyToOne(() => Section, (section) => section.id_section)
  id_section: Section

  @Column({default: 1})
  quantity: number

  @Column({nullable: true})
  zone: string

  @Column({nullable: true})
  observations: string

  @Column()
  phase: string

  @Column({nullable: true})
  voice: string

}
