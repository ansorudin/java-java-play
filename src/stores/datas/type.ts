export interface IdataProfile {
  playerId: string;
  playerName: string;
  gender: string;
  skill: string;
  skin: string;
  profileImages: string[];
  confirmationImages: string[];
  leaderBoardImages: string;
  image: string;
  color: string;
}

interface data {
  name: string;
  image: string;
  color: string;
}
export interface IdataOtherPlayer {
  bank: data;
  tax: data;
}
