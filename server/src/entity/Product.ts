import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Brand } from "./Brand"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

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

    @ManyToOne(() => Brand)
    brand: Brand

    @Column("boolean", {default: false})
    favorite: boolean

}
