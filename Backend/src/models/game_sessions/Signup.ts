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

  @ManyToOne(() => Session, (session) => session.signups, { nullable: false, onDelete: "CASCADE", })
  @JoinColumn({ name: "sessionId" })
  session!: Session;

  @ManyToOne(() => SessionGame, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "gameId" })
  game!: SessionGame | null;

  constructor(memberId: string, status: string, createdAt: string) {
    this.memberId = memberId;
    this.status = status;
    this.createdAt = createdAt;
  }
}

export { SessionSignup };
