import { StateCreator } from 'zustand';
import CryptoJS from 'react-native-crypto-js';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';

export interface NfcSlice {
  nfcId: string | null;
  activeTags: string[];
  errorNfcReadTag: string | null;
  getDecryptData: (data: string) => void;
  onReadTagNfc: () => void;
  clearDataNfc: () => void;
  setActiveTag: (nfcTag: string) => void;
}

export const createNfcSlice: StateCreator<NfcSlice> = set => ({
  nfcId: null,
  activeTags: [],
  errorNfcReadTag: null,
  getDecryptData: (data: string) => {
    const bytes = CryptoJS.AES.decrypt(data, 'secret');
    return bytes.toString(CryptoJS.enc.Utf8);
  },
  onReadTagNfc: async () => {
    try {
      await NfcManager.registerTagEvent();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
        if (tag.ndefMessage) {
          const ndefRecords = tag.ndefMessage;
          const parseData = ndefRecords.map((record: any) =>
            Ndef.text.decodePayload(record.payload),
          );
          const decrypt = parseData.map((data: string) => getDecryptData(data));
          const textData = JSON.parse(decrypt.join('\n'));
          const id = textData.playerId;

          set(state => {
            const isId = state.activeTags.includes(tag.id);
            if (!isId) {
              return {
                errorNfcReadTag:
                  'Invalid card, always use an authorized card to access this application.',
              };
            }
            return { nfcId: id, errorNfcReadTag: null };
          });
        } else {
          set({ errorNfcReadTag: 'Tag cannot read, try again!!' });
        }
      });
    } catch (error: any) {
      set({ errorNfcReadTag: error.message });
    }
  },
  clearDataNfc: () => {
    set({ errorNfcReadTag: null });
    set({ nfcId: null });
  },
  setActiveTag: (nfcTag: string) => {
    set(state => ({ activeTags: [...state.activeTags, nfcTag] }));
  },
});
function getDecryptData(data: string) {
  const bytes = CryptoJS.AES.decrypt(data, 'secret');
  return bytes.toString(CryptoJS.enc.Utf8);
}
