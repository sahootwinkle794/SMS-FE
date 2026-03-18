import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SocietyState {
  societyId: string | null;
  societyName: string | null;
  setSociety: (id: string, name: string) => void;
  clearSociety: () => void;
}

export const useSocietyStore = create<SocietyState>()(
  persist(
    (set) => ({
      societyId: null,
      societyName: null,
      setSociety: (id, name) => set({ societyId: id, societyName: name }),
      clearSociety: () => set({ societyId: null, societyName: null }),
    }),
    { name: "society-storage" }
  )
);