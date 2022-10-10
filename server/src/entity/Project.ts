import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Client } from "./Client"

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id_project: number

    @Column()
    name: string

    @Column("text")
    address: string

    @OneToOne(() => Client)
    @JoinColumn()
    client: Client

}
