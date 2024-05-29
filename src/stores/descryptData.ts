import { StateCreator } from 'zustand';
import CryptoJS from 'react-native-crypto-js';

export interface DescrypSlice {
  getDecryptData: (data: string) => void;
}

export const createDescrypSlice: StateCreator<DescrypSlice> = () => ({
  getDecryptData: (data: string) => {
    const bytes = CryptoJS.AES.decrypt(data, 'secret');
    return bytes.toString(CryptoJS.enc.Utf8);
  },
});
