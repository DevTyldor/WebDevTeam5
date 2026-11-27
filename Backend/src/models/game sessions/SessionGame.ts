import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Session } from "./Session.js";

@Entity()
class SessionGame {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name: string;

  @Column("integer")
  minPlayers: number;

  @Column("integer")
  maxPlayers: number;

  @Column("boolean")
  enoughPlayers: boolean;

  @ManyToOne(() => Session, (session) => session.games, { nullable: false, onDelete: "CASCADE", })
  session!: Session;

  constructor(name: string, min: number, max: number, enoughPlayers: boolean) {
    this.name = name;
    this.minPlayers = min;
    this.maxPlayers = max;
    this.enoughPlayers = enoughPlayers;
  }
}

export { SessionGame };
