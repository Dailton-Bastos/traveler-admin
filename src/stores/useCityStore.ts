import { create } from 'zustand';

type CityStore = {
  currentStep: '01' | '02';
  setCurrentStep: (step: '01' | '02') => void;
};

export const useCityStore = create<CityStore>((set) => ({
  currentStep: '01',
  setCurrentStep: (step: '01' | '02') => set(() => ({ currentStep: step })),
}));
