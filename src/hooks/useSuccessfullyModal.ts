import { create } from 'zustand';

type SuccessfullyModalStore = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  title: string;
  setTitle: (title: string) => void;
  description?: string;
  setDescription: (description: string) => void;
};

export const useSuccessfullyModal = create<SuccessfullyModalStore>((set) => ({
  isOpen: false,
  onOpenChange: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  title: '',
  setTitle: (title: string) => set({ title }),
  description: '',
  setDescription: (description?: string) => set({ description }),
}));
