import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Project } from "./Project"

/**
 * Entidad que construye una
 * cotización de un proyecto
 */
@Entity()
export class Quote {

    @PrimaryGeneratedColumn()
    id_quote: number

    @Column()
    version: number

    @ManyToOne(() => Project)
    project: Project

}
