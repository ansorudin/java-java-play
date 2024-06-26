import { StateCreator } from 'zustand';
import getRealm, { Player, Histories } from '../components/schema/SchemaRealm';

export interface TaxSlice {
  taxAmount: number;
  onChangeTax: (amount: number) => void;
  onTaxPayment: (amount: number, playerId: string) => void;
  errTaxPayment: string | null;
}

export const createTaxSlice: StateCreator<TaxSlice> = set => ({
  taxAmount: 0,
  errTaxPayment: null,
  onChangeTax: (amount: number) => {
    set({ taxAmount: amount });
  },
  onTaxPayment: (amount: number, playerId: string) => {
    const realm = getRealm();
    if (!realm.isInTransaction) {
      try {
        realm.write(() => {
          const player = realm.objectForPrimaryKey<Player>('PlayerGame', playerId);
          if (!player) {
            set({ errTaxPayment: 'Player Not Found' });
            return;
          }
          if (player.saldo < amount) {
            set({ errTaxPayment: 'Not enough money to prosess this transaction' });
            return;
          }
          player.saldo = player.saldo - amount;
          set(state => ({ taxAmount: state.taxAmount + amount }));
        });

        try {
          const histories = realm.objectForPrimaryKey<Histories>('TransactionHistory', playerId);
          const dataToSend: any = {
            id: playerId,
            playerName: 'Tax',
            playerImage: 1,
            transaction: 'Transfer to Tax',
            amount,
          };

          if (histories) {
            histories.histories.push(dataToSend);
          } else {
            realm.create('TransactionHistory', {
              id: playerId,
              histories: [dataToSend],
            });
          }
        } catch (error) {
          set({ errTaxPayment: 'Invalid Transaction Type or Missing Recipients' });
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  },
});
