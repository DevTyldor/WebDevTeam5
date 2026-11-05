import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Shelf {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    owner: string;

    @Column("text")
    name: string;

    @Column("text")
    description: string;

    @Column("boolean")
    isPublic: boolean;

    constructor(o: string, n: string, d: string, p: boolean){
        this.owner = o;
        this.name = n;
        this.description = d;
        this.isPublic = p;
    }
}

export {Shelf}
