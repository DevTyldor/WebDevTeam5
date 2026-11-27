import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Participant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name: string;
  
  @Column("varchar")
  game: string;

  constructor(name: string, game: string){
    this.name = name;
    this.game = game;
  }
}

export {
    Participant
}