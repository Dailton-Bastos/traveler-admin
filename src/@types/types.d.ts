import * as zod from 'zod';
import { cityFormValidationSchema } from '~/schemas/newCitySchema';

export interface UserInfo {
  id: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
}

export interface Category {
  id: string;
  name: string;
  image_path: string;
}

export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export type CityFormData = zod.infer<typeof cityFormValidationSchema>;
