
import type { SessionGame } from "./SessionGame";
import type { SessionSignup } from "./Signup";

export interface Session {
  id: number;
  name: string;
  description: string;
  host: string;
  date: string;
  time: string;
  place: string;
  capacity: number;
  status: "Open" | "Full" | "Cancelled";
  games: SessionGame[];
  signups: SessionSignup[];
}
