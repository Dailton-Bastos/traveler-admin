import * as zod from 'zod';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const MESSAGE = '*Campo obrigatório';

export const cityFormValidationSchema = zod.object({
  cityName: zod
    .string({
      required_error: 'Nome da cidade obrigatório',
    })
    .trim()
    .min(1, { message: MESSAGE }),

  cityImage: zod
    .any()
    .refine((files) => files?.length == 1, 'Adicione uma imagem da cidade')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Apenas JPEG, JPG e PNG'
    ),
  cityDescription: zod.string({ required_error: MESSAGE }).trim().min(100, {
    message: 'Mínimo de 100 caracteres',
  }),
  placeName: zod
    .string({
      required_error: MESSAGE,
    })
    .trim()
    .min(1, { message: MESSAGE }),

  placeImage: zod
    .any()
    .refine((files) => files?.length == 1, 'Adicione uma imagem do local')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Apenas JPEG, JPG e PNG'
    ),
  placeDescription: zod.string({ required_error: MESSAGE }).trim().min(100, {
    message: 'Mínimo de 100 caracteres',
  }),
  categoryId: zod
    .string({ required_error: 'Selecione uma categoria' })
    .trim()
    .min(1, {
      message: 'Selecione uma categoria',
    }),

  address: zod.object({
    zipCode: zod
      .string({
        required_error: 'CEP obrigatório',
      })
      .trim()
      .max(9, 'CEP inválido')
      .refine((data) => isValidCEP(data), {
        message: 'CEP inválido',
      }),

    street: zod.string({ required_error: 'Rua obrigatória' }).trim().min(1, {
      message: 'Rua obrigatória',
    }),

    neighborhood: zod
      .string({ required_error: 'Bairro obrigatório' })
      .trim()
      .min(1, { message: 'Bairro obrigatório' }),
    number: zod.string({ required_error: 'Número obrigatório' }).trim().min(1, {
      message: 'Número obrigatório',
    }),
    complement: zod.string().optional(),
  }),
});
