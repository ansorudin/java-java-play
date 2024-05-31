import { StateCreator } from 'zustand';
import { IdataProfile } from './datas/type';
import { dataProfile } from './datas/dataPlayer';

export interface ProfileSlice {
  profiles: IdataProfile[];
  selectedProfile: IdataProfile | null;
  setProfiles: (profile: IdataProfile[]) => void;
  getSelectedProfile: (playerId: string) => IdataProfile | null;
}

export const createProfileSlice: StateCreator<ProfileSlice> = set => ({
  profiles: dataProfile,
  selectedProfile: null,
  setProfiles: profiles => set({ profiles }),
  getSelectedProfile: (playerId: string) => {
    const selectedData = dataProfile.find(profile => profile.playerId === playerId) || null;
    return selectedData;
  },
});
