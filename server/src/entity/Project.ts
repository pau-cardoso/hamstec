import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Client } from "./Client"

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column("text", {nullable: true})
    address: string

    @ManyToOne(() => Client, {onDelete: 'CASCADE'})
    client: Client

}
