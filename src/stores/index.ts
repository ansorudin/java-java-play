import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './auth';
import { ProfileSlice, createProfileSlice } from './dataPlayer';
import { PlayerSlice, createPlayerSlice } from './activePlayer';
import { DescrypSlice, createDescrypSlice } from './descryptData';
import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type GlobalStoreProps = AuthSlice & ProfileSlice & PlayerSlice & DescrypSlice;

export const STORAGE_KEY = 'app-storage';

export const useGlobalStore = create<
  GlobalStoreProps,
  [['zustand/persist', Pick<GlobalStoreProps, 'username'>]]
>(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createProfileSlice(...a),
      ...createPlayerSlice(...a),
      ...createDescrypSlice(...a),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        username: state.username,
      }),
    },
  ),
);
