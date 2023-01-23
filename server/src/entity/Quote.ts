import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Project } from "./Project"

/**
 * Entidad que construye una
 * cotización de un proyecto
 */
@Entity()
export class Quote {

    @PrimaryGeneratedColumn()
    id: number

    @Column("decimal", { scale: 1, nullable: true, default: 1 })
    version: number

    @ManyToOne(() => Project, {onDelete: 'CASCADE'})
    project: Project

    @Column("money", {default: 0, nullable: true })
    expenses: number

    @Column("boolean", {default: false})
    authorized: boolean

    @Column("money", {default: 0})
    discount: number

}
