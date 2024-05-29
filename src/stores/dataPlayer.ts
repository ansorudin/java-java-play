import { StateCreator } from 'zustand';
import { IdataProfile } from './datas/type';
import { dataProfile } from './datas/dataPlayer';

export interface ProfileSlice {
  profiles: IdataProfile[];
  selectedProfile: IdataProfile | null;
  setProfiles: (profile: IdataProfile[]) => void;
  setSelectedProfile: (profile: IdataProfile) => void;
}

export const createProfileSlice: StateCreator<ProfileSlice> = set => ({
  profiles: dataProfile,
  selectedProfile: null,
  setProfiles: profiles => set({ profiles }),
  setSelectedProfile: profile => set({ selectedProfile: profile }),
});
