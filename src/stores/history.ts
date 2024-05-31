import { StateCreator } from 'zustand';
import getRealm from '../components/schema/SchemaRealm';
import { Histories } from '../components/schema/SchemaRealm';
import { HistoryPlayer } from './type';

export interface HistorySlice {
  histories: HistoryPlayer[] | [];
  errorMessageHistory: string | null;
  setDataHistory: (data: HistoryPlayer) => void;
}

export const createHistorySlice: StateCreator<HistorySlice> = set => ({
  histories: [],
  errorMessageHistory: null,
  setDataHistory: (data: HistoryPlayer) => {
    const realm = getRealm();
    try {
      const histories = realm.objectForPrimaryKey<Histories>('TransactionHistory', data.id);
      const dataToSend: any = {
        id: data.id,
        playerName: data.playerName,
        playerImage: data.playerImage,
        transaction: data.transaction,
        amount: data.amount,
      };
      if (histories) {
        histories.histories.push(dataToSend);
      } else {
        realm.create('TransactionHistory', {
          id: data.id,
          histories: [data],
        });
      }
    } catch (error: any) {
      set({ errorMessageHistory: error.message });
    }
  },
});
