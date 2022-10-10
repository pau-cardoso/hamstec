import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id_client: number

    @Column()
    name: string

    @Column("text")
    phone: string

    @Column()
    email: string

}
