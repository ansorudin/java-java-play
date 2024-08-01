import { StateCreator } from 'zustand';
import { IdataProfile, IdataOtherPlayer } from './datas/type';
import { dataProfile, dataOtherPlayer } from './datas/dataPlayer';

export interface ProfileSlice {
  profiles: IdataProfile[];
  dataOtherPlayer: IdataOtherPlayer;
  selectedProfile: IdataProfile | null;
  setProfiles: (profile: IdataProfile[]) => void;
  getSelectedProfile: (playerId: string) => IdataProfile | null;
}

export const createProfileSlice: StateCreator<ProfileSlice> = set => ({
  profiles: dataProfile,
  dataOtherPlayer: dataOtherPlayer,
  selectedProfile: null,
  setProfiles: profiles => set({ profiles }),
  getSelectedProfile: (playerId: string) => {
    const selectedData = dataProfile.find(profile => profile.playerId === playerId) || null;
    return selectedData;
  },
});
