import { StateCreator } from 'zustand';

export interface TaxSlice {
  taxAmount: number;
  onChangeTax: (amount: number) => void;
}

export const createTaxSlice: StateCreator<TaxSlice> = set => ({
  taxAmount: 0,
  onChangeTax: (amount: number) => {
    set({ taxAmount: amount });
  },
});
