import { create } from 'zustand';

interface UserState {
  selectedUser: string | null;
  setSelectedUser: (user: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
