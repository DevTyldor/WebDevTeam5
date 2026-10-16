import type { SessionGame } from "./SessionGame";
import type { Participant } from "./Participant";

export interface Session {
  id: number;
  name: string;
  description: string;
  host: string;
  date: string;
  time: string;
  place: string;
  capacity: number;
  confirmed: number;
  status: "Open" | "Full" | "Cancelled";
  waitingList: string[];
  games: SessionGame[];
  participants: Participant[];
}