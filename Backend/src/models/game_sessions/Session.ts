import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { SessionGame } from "./SessionGame.js";
import { SessionSignup } from "./Signup.js";

@Entity()
class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;

  @Column("varchar")
  host: string;

  @Column("varchar")
  date: string;

  @Column("varchar")
  time: string;

  @Column("varchar")
  place: string;

  @Column("integer")
  capacity: number;

  @Column("varchar", { default: "open" })
  status: string;

  @OneToMany(() => SessionGame, (game) => game.session)
  games: SessionGame[];

  @OneToMany(() => SessionSignup, (signup) => signup.session)
  signups: SessionSignup[];

  constructor(
    name: string,
    description: string,
    host: string,
    date: string,
    time: string,
    place: string,
    capacity: number,
    status: string,
    games: SessionGame[],
    signups: SessionSignup[],
  ) {
    this.name = name;
    this.description = description;
    this.host = host;
    this.date = date;
    this.time = time;
    this.place = place;
    this.capacity = capacity;
    this.status = status;
    this.games = games;
    this.signups = signups;
  }
}

const sessions: Session[] = [];

function addSession(s: Session) {
  sessions.push(s);
}

function deleteSession(id: number) {
  const index = sessions.findIndex((s) => s.id === id);

  if (index !== -1) {
    sessions.splice(index, 1);
  }
}

function getAllSessions(): Session[] {
  return sessions;
}

function getOneSession(id: number): Session | undefined {
  let found = sessions.find((s) => s.id == id);
  return found ? found : undefined;
}

export { Session, addSession, deleteSession, getAllSessions, getOneSession };
