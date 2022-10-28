import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id_product: number

    @Column()
    name: string

    @Column({nullable: true})
    code: string

    @Column({nullable: true})
    image: string

    @Column({nullable: true, default: "https://reactnative.dev/img/tiny_logo.png"})
    description: string

    @Column("money")
    price: number

    @Column("money", {nullable: true, default: 0})
    installation: number

    @Column("money")
    utility: number

    @Column("money")
    public_price: number

}
