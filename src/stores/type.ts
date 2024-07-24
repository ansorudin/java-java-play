export interface IPlayer {
  id: string;
  username: string;
  saldo: number;
}

export interface HistoryPlayer {
  id: string;
  history: History[];
}

export interface History {
  id: string;
  playerName?: string;
  playerImage: number;
  transaction: string;
  amount: number;
}
