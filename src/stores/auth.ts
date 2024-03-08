import { StateCreator } from 'zustand';

export type AuthSlice = {
  username: string | null;
  onAuthSuccess: ({ username }: { username: string }) => void;
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = set => ({
  username: null,
  onAuthSuccess: payload => {
    set(() => ({ ...payload }));
  },
});
