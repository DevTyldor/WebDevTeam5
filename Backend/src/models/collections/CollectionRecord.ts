import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class CollectionRecord {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    owner: string;

    @Column("integer")
    gameId: number;

    @Column("text")
    status: string;

    @Column("integer")
    plays: number;

    @Column("integer")
    rating: number;

    @Column("text")
    note: string;

    constructor(o: string, g: number, s: string, p: number, r: number, n: string){
        this.owner = o;
        this.gameId = g;
        this.status = s;
        this.plays = p;
        this.rating = r;
        this.note = n;
    }
}

export {CollectionRecord}
