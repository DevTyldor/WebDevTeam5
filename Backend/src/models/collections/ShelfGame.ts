import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class ShelfGame {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("integer")
    shelfId: number;

    @Column("integer")
    gameId: number;

    constructor(s: number, g: number){
        this.shelfId = s;
        this.gameId = g;
    }
}

export {ShelfGame}
