import { create } from 'zustand';

interface UserState {
  name: string;
  points: number;
  setUser: (name: string, points: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  points: 0,
  setUser: (name: string, points: number) => set({ name, points }),
}));
