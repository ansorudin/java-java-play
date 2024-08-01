import { StateCreator } from 'zustand';
import { IPlayer } from './type';

export interface PlayerSlice {
  activePlayers: IPlayer[];
  leaderBoard: IPlayer[];
  setPlayers: (players: IPlayer[]) => void;
  setLeaderBoard: () => void;
  removePlayer: () => void;
  removePlayerById: (id: string) => void;
  isLoading: boolean;
  editPlayer: (id: string, newUsername: string) => void;
  setSaldoPlayer: (id: string, newSaldo: number) => void;
}

export const createPlayerSlice: StateCreator<PlayerSlice> = (set, get) => ({
  isLoading: true,
  activePlayers: [],
  leaderBoard: [],
  setPlayers: players => set({ activePlayers: players }),
  setLeaderBoard: () => {
    const { activePlayers } = get();
    const dataLeaderBoard = activePlayers.sort((a, b) => b.saldo - a.saldo).slice(0, 3);
    set({ leaderBoard: dataLeaderBoard });
    set({ isLoading: false });
  },
  removePlayer: () => {
    set({ activePlayers: [] });
  },
  removePlayerById: id => {
    const { activePlayers } = get();
    const dataActivePlayer = activePlayers.filter(player => player.id !== id);
    set({ activePlayers: dataActivePlayer });
  },
  editPlayer: (id: string, newUsername: string) => {
    const { activePlayers } = get();
    const playerSelected = activePlayers.map(player => {
      if (player.id === id) {
        return { ...player, username: newUsername };
      }
      return player;
    });

    set({ activePlayers: playerSelected });
  },
  setSaldoPlayer: (id: string, newSaldo: number) => {
    const { activePlayers } = get();

    const playerSelected = activePlayers.map(player => {
      if (player.id === id) {
        return { ...player, saldo: newSaldo };
      }
      return player;
    });

    set({ activePlayers: playerSelected });
  },
});
