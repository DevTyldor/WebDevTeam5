import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Participant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;
  
  @Column()
  game: string;

  constructor(n: string, g: string){
    this.name = n;
    this.game = g;
  }
}

export {
    Participant
}