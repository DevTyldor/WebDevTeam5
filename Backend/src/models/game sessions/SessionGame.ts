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

  @ManyToOne(() => Session, (session) => session.games)
  session!: Session;

  constructor(n: string, min: number, max: number, e: boolean) {
    this.name = n;
    this.minPlayers = min;
    this.maxPlayers = max;
    this.enoughPlayers = e;
  }
}

export { SessionGame };
