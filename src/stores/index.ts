import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './auth';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type GlobalStoreProps = AuthSlice;

export const STORAGE_KEY = 'app-storage';

export const useGlobalStore = create<
  GlobalStoreProps,
  [['zustand/persist', Pick<GlobalStoreProps, 'username'>]]
>(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
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
