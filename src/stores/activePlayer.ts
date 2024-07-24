import { StateCreator } from 'zustand';
import { IPlayer } from './type';

export interface PlayerSlice {
  activePlayers: IPlayer[];
  leaderBoard: IPlayer[];
  setPlayers: (players: IPlayer[]) => void;
  setLeaderBoard: (leaderBoard: IPlayer[]) => void;
  getDataPlayer: () => void;
}

export const createPlayerSlice: StateCreator<PlayerSlice> = (set, get) => ({
  activePlayers: [],
  leaderBoard: [],
  setPlayers: players => set({ activePlayers: players }),
  setLeaderBoard: leaderBoard => set({ leaderBoard }),
  getDataPlayer: () => {
    const { activePlayers } = get();
    const dataLeaderBoard = activePlayers.sort((a, b) => b.saldo - a.saldo).slice(0, 3);
    set({ leaderBoard: dataLeaderBoard });
  },
});
