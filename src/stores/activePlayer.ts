import { StateCreator } from 'zustand';
import { IPlayer } from './type';
import getRealm, { Player } from '../components/schema/SchemaRealm';

export interface PlayerSlice {
  activePlayer: IPlayer[];
  leaderBoard: IPlayer[];
  setPlayers: (players: IPlayer[]) => void;
  setLeaderBoard: (leaderBoard: IPlayer[]) => void;
  getDataPlayer: () => void;
}

export const createPlayerSlice: StateCreator<PlayerSlice> = set => ({
  activePlayer: [],
  leaderBoard: [],
  setPlayers: players => set({ activePlayer: players }),
  setLeaderBoard: leaderBoard => set({ leaderBoard }),
  getDataPlayer: () => {
    const realm = getRealm();
    const dataPlayer = realm.objects<Player>('PlayerGame');
    set({ activePlayer: Array.from(dataPlayer) });
    const dataLeaderBoard = realm.objects<Player>('PlayerGame').sorted('saldo', true).slice(0, 3);
    set({ leaderBoard: Array.from(dataLeaderBoard) });
  },
});
