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
  id: number

  @ManyToOne(() => Product, (product) => product.id)
  product: Product

  @ManyToOne(() => Quote, (quote) => quote.id)
  quote: Quote

  @ManyToOne(() => Section, (section) => section.id)
  section: Section

  @Column({default: 1})
  quantity: number

  @Column({nullable: true})
  zone: string

  @Column({nullable: true})
  area: string

  @Column({nullable: true})
  observations: string

  @Column()
  phase: string

  @Column({nullable: true})
  voice: string

}
