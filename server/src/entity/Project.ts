import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Client } from "./Client"

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id_project: number

    @Column()
    name: string

    @Column("text")
    address: string

    @ManyToOne(() => Client)
    client: Client

}
