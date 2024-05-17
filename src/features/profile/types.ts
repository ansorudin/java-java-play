export interface IProfile {
  image: string;
  title: string;
  description: string;
}

export interface Ibank {
  nominal?: number;
  description?: string;
}

export interface Iconfirmation {
  isOpen: boolean;
  title: string;
  nominal: number;
  description?: string;
  handleClose?: () => void;
  handleSure?: () => void;
}

export interface IModalContent {
  handleClose: () => void;
  handleNextPlayer: (player: string, nominal: number) => void;
  handleNextBank: (nominal: number, description: string) => void;
  handleNextPajak: (nominal: number) => void;
  methode: string | null;
}

export interface IdataProfile {
  playerId: string;
  playerName: string;
  gender: string;
  description: string;
  totalBalance: number;
  skin: string;
}
