import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Quote } from "./Quote"

@Entity()
export class QuotePdf {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    filename: string

    @ManyToOne(() => Quote, {onDelete: 'CASCADE'})
    quote: Quote

}
