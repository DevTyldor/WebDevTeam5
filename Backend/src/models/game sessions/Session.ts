import type { SessionSignup } from "./Signup.js";
import type { SessionGame } from "./SessionGame.js";

class Session {
  id: number;
  name: string;
  description: string;
  host: string;
  date: string;
  time: string;
  place: string;
  capacity: number;
  status: string;
  games: SessionGame[];
  signups: SessionSignup[];

  constructor(i: number, n: string, de: string, h: string, da: string, t: string, p: string, c: number, s: string, g: SessionGame[], si:SessionSignup[]){
    this.id = i;
    this.name = n;
    this.description = de;
    this.host = h;
    this.time = t;
    this.date = da;
    this.place = p;
    this.capacity = c;
    this.status = s;
    this.games = g;
    this.signups = si;
  }
}

export {
    Session
}
