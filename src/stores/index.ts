import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './auth';
import { ProfileSlice, createProfileSlice } from './dataPlayer';
import { PlayerSlice, createPlayerSlice } from './activePlayer';
import { NfcSlice, createNfcSlice } from './nfc';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TaxSlice, createTaxSlice } from './taxAmount';
import { HistorySlice, createHistorySlice } from './history';
import { PlayerIncomeSlice, createPlayerIncomeSlice } from './playerIncome';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type GlobalStoreProps = AuthSlice &
  ProfileSlice &
  PlayerSlice &
  NfcSlice &
  TaxSlice &
  HistorySlice &
  PlayerIncomeSlice;

export const STORAGE_KEY = 'app-storage';

export const useGlobalStore = create<
  GlobalStoreProps,
  [['zustand/persist', Pick<GlobalStoreProps, 'username' | 'taxAmount'>]]
>(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createProfileSlice(...a),
      ...createPlayerSlice(...a),
      ...createNfcSlice(...a),
      ...createTaxSlice(...a),
      ...createHistorySlice(...a),
      ...createPlayerIncomeSlice(...a),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        username: state.username,
        taxAmount: state.taxAmount,
      }),
    },
  ),
);
