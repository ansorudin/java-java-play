import { StateCreator } from 'zustand';
import getRealm, { Histories, Player } from '../components/schema/SchemaRealm';
const imageBank = require('../../asset/government.png');

export interface PlayerIncomeSlice {
  onSalaryIncome: (amount: number, playerId: string) => void;
  errPlayerIncome: string | null;
  successPlayerIncome: string | null;
  onAddHistory: (playerId: string, dataToSend: any) => void;
  onChallengeIncome: (playerId: string) => void;
}

export const createPlayerIncomeSlice: StateCreator<PlayerIncomeSlice> = (set, get) => ({
  errPlayerIncome: null,
  successPlayerIncome: null,
  onAddHistory: (playerId, dataToSend) => {
    const realm = getRealm();
    try {
      const histories = realm.objectForPrimaryKey<Histories>('TransactionHistory', playerId);

      if (histories) {
        histories.histories.push(dataToSend);
      } else {
        realm.create('TransactionHistory', {
          id: playerId,
          histories: [dataToSend],
        });
      }
    } catch (error) {
      set({ errPlayerIncome: 'Invalid Transaction Type or Missing Recipients' });
      return;
    }
  },
  onSalaryIncome: (amount, playerId) => {
    const realm = getRealm();
    try {
      if (!realm.isInTransaction) {
        realm.write(() => {
          const player = realm.objectForPrimaryKey<Player>('PlayerGame', playerId);
          if (!player) {
            set({ errPlayerIncome: 'Player not found' });
            return;
          }
          player.saldo = player.saldo + amount;

          const dataToSend: any = {
            id: playerId,
            playerName: 'Bank',
            playerImage: imageBank,
            transaction: 'Salary start',
            amount,
          };
          const onAddHistory = get().onAddHistory;
          onAddHistory(playerId, dataToSend);
        });
        set({ successPlayerIncome: 'Success your action' });
      }
    } catch (error: any) {
      set({ errPlayerIncome: error.message });
    }
  },
  onChallengeIncome: playerId => {
    const realm = getRealm();
    try {
      if (!realm.isInTransaction) {
        realm.write(() => {
          const player = realm.objectForPrimaryKey<Player>('PlayerGame', playerId);
          if (!player) {
            set({ errPlayerIncome: 'Player not found' });
            return;
          }
          player.saldo = player.saldo + 40000;

          const dataToSend: any = {
            id: playerId,
            playerName: 'Bank',
            playerImage: imageBank,
            transaction: 'Challenge Win!!',
            amount: 40000,
          };
          const onAddHistory = get().onAddHistory;
          onAddHistory(playerId, dataToSend);
        });
        set({ successPlayerIncome: 'Success your action' });
      }
    } catch (error: any) {
      set({ errPlayerIncome: error.message });
    }
  },
});
