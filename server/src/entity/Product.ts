import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id_product: number

    @Column()
    name: string

    @Column("text")
    description: string

    @Column("money")
    price: number

    @Column("money")
    installation: number

    @Column("money")
    utility: number

    @Column("money")
    public_price: number

}
