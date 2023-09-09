import * as zod from 'zod';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const cityFormValidationSchema = zod.object({
  cityName: zod
    .string({
      required_error: 'Nome da cidade obrigatório',
    })
    .min(3, { message: 'Mínimo 3 caracteres' }),

  cityImage: zod
    .any()
    .refine((files) => files?.length == 1, 'Imagem obrigatória')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Apenas JPEG, JPG e PNG'
    ),
  cityDescription: zod
    .string({ required_error: 'Descrição obrigatória' })
    .nonempty({
      message: 'Descrição obrigatória',
    }),
  localeName: zod
    .string({
      required_error: 'Nome do local obrigatório',
    })
    .min(3, { message: 'Mínimo 3 caracteres' }),

  localeImage: zod
    .any()
    .refine((files) => files?.length == 1, 'Imagem obrigatória')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Apenas JPEG, JPG e PNG'
    ),
  localeDescription: zod
    .string({ required_error: 'Descrição obrigatória' })
    .nonempty({
      message: 'Descrição obrigatória',
    }),
  category: zod.string({ required_error: 'Categoria obrigatória' }).nonempty({
    message: 'Selecione uma categoria',
  }),

  address: zod.object({
    zipCode: zod
      .string({
        required_error: 'CEP obrigatório',
      })
      .max(9, 'CEP inválido')
      .refine((data) => isValidCEP(data), {
        message: 'CEP inválido',
      }),

    street: zod.string({ required_error: 'Rua obrigatória' }).nonempty({
      message: 'Rua obrigatória',
    }),
    neighborhood: zod
      .string({ required_error: 'Bairro obrigatório' })
      .nonempty({
        message: 'Bairro obrigatório',
      }),
    number: zod.string({ required_error: 'Número obrigatório' }).nonempty({
      message: 'Número obrigatório',
    }),
    complement: zod.string().optional(),
  }),
});
