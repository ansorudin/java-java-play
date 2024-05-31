export interface IPlayer {
  id: string;
  username: string;
  saldo: number;
}

export interface HistoryPlayer {
  id: string;
  playerName: string;
  playerImage: number;
  transaction: string;
  amount: number;
}
