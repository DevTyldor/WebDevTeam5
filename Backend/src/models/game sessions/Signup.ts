import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { Session } from "./Session.js";
import { SessionGame } from "./SessionGame.js";

@Entity()
class SessionSignup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  memberId: string;

  @Column("varchar")
  status: string;

  @Column("varchar")
  createdAt: string;

  @ManyToOne(() => Session, (session) => session.signups, { nullable: false })
  @JoinColumn({ name: "sessionId" })
  session!: Session;

  @ManyToOne(() => SessionGame, { nullable: true })
  @JoinColumn({ name: "gameId" })
  game!: SessionGame | null;

  constructor(m: string, st: string, c: string) {
    this.memberId = m;
    this.status = st;
    this.createdAt = c;
  }
}

export { SessionSignup };
