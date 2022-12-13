import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column("text", {nullable: true})
    phone: string

    @Column({nullable: true})
    email: string

}
