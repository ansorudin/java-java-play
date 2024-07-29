import { StateCreator } from 'zustand';
import { HistoryPlayer, History } from './type';

export interface HistorySlice {
  histories: HistoryPlayer[] | [];
  errorMessageHistory: string | null;
  setDataHistory: (data: History, id: string) => void;
  removeHistory: () => void;
  removeHistoryById: (id: string) => void;
}

export const createHistorySlice: StateCreator<HistorySlice> = (set, get) => ({
  histories: [],
  errorMessageHistory: null,
  setDataHistory: (data: History, id: string) => {
    try {
      const { histories } = get();
      const existingHistoryPlayerIndex = histories.findIndex(player => player.id === id);
      console.log(existingHistoryPlayerIndex);

      if (existingHistoryPlayerIndex !== -1) {
        // Update the existing history player by adding a new history entry
        histories[existingHistoryPlayerIndex].history.push(data);
        set({ histories: [...histories] });
      } else {
        // Add a new history player
        const newHistoryPlayer: HistoryPlayer = {
          id,
          history: [data],
        };
        set({ histories: [...histories, newHistoryPlayer] });
      }
    } catch (error: any) {
      set({ errorMessageHistory: error.message });
    }
  },
  removeHistory: () => {
    set({ histories: [] });
  },
  removeHistoryById(id: string) {
    const { histories } = get();
    const historiesNew = histories.filter(history => history.id !== id);
    set({ histories: historiesNew });
  },
});
