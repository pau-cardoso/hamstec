import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

/**
 * Objeto que simula las secciones de una casa
 * Ejemplo: Planta baja, Planta alta, Sótano, etc.
 */

@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id_section: number

    @Column()
    name: string

}
