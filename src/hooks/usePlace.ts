import { create } from 'zustand';
import { Category, PlaceCard } from '~/@types/types';

type PlaceStore = {
  category: Category;
  setCategory: (category: Category) => void;
  place: PlaceCard;
  setPlace: (place: PlaceCard) => void;
};

export const usePlace = create<PlaceStore>((set) => ({
  category: {
    id: '',
    name: '',
    image_path: '',
  },
  setCategory: (category: Category) => set({ category }),
  place: {
    id: '',
    name: '',
    image_path: '',
  },
  setPlace: (place: PlaceCard) => set({ place }),
}));
