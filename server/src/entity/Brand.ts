import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
    id_brand: number

    @Column()
    name: string

}
