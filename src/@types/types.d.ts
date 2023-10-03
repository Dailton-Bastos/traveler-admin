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

type HtmlType = string | React.ReactElement;

export type MdEditorType = {
  id?: string;
  defaultValue?: string;
  value?: string;
  renderHTML?: (
    text: string
  ) => HtmlType | Promise<HtmlType> | (() => HtmlType);
  style?: React.CSSProperties;
  autoFocus?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  config?: any;
  plugins?: string[];
  onChange?: (
    data: {
      text: string;
      html: string;
    },
    event?: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onScroll?: (
    e: React.UIEvent<HTMLTextAreaElement | HTMLDivElement>,
    type: 'md' | 'html'
  ) => void;
};

export type CityFormData = zod.infer<typeof cityFormValidationSchema>;

export type CityData = {
  name: string;
  description: string;
  image_path: string;
};

export type AddressData = {
  postal_code: string;
  street: string;
  neighborhood: string;
  number: string;
  complement?: string;
};

export type PlaceData = {
  city_id: number;
  address_id: number;
  category_id: number;
  name: string;
  description: string;
  image_path: string;
};

export type CityCard = {
  id: string;
  name: string;
  image_path: string | undefined;
  totalPlaces: number;
};

export type PlaceCard = {
  id: string;
  name: string;
  image_path: string | undefined;
};
