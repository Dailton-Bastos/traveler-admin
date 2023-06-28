import { create } from 'zustand';

interface SignOutModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSignOutModal = create<SignOutModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
