'use client';

import React from 'react';
import { FiAlertCircle, FiPlus } from 'react-icons/fi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import uniqid from 'uniqid';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { FileInput } from '~/components/FileInput';
import { toast } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const categoryFormValidationSchema = zod.object({
  name: zod
    .string({
      required_error: 'Nome obrigatório',
    })
    .min(3, { message: 'Mínimo 3 caracteres' }),

  image: zod
    .any()
    .refine((files) => files?.length == 1, 'Ícone obrigatório')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Apenas JPEG, JPG e PNG'
    ),
});

type CategoryFormData = zod.infer<typeof categoryFormValidationSchema>;

export const FormContent = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      image: null,
    },
  });

  const { register, formState, handleSubmit, reset } = form;

  const { errors } = formState;

  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onSubmit: SubmitHandler<CategoryFormData> = React.useCallback(
    async (data) => {
      try {
        setIsLoading(true);

        const iconFile = data?.image?.[0];

        if (!iconFile) return toast.error('Ícone obrigatório');

        const uniqueID = uniqid();

        const { data: iconData, error: iconError } =
          await supabaseClient.storage
            .from('images')
            .upload(`icon-category-${uniqueID}`, iconFile, {
              cacheControl: '3600',
              upsert: false,
            });

        if (iconError) {
          setIsLoading(false);

          return toast.error('Erro ao salvar ícone');
        }

        const { error: supabaseError } = await supabaseClient
          .from('categories')
          .insert({
            image_path: iconData?.path,
            name: data?.name,
          });

        if (supabaseError) {
          setIsLoading(false);

          return toast.error(supabaseError?.message);
        }

        setIsLoading(false);
        toast.success('Categoria adicionada');
        reset();
        router.replace('/categories');
      } catch (error) {
        toast.error('Ocorreu um erro');
      } finally {
        setIsLoading(false);
      }
    },
    [supabaseClient, reset, router]
  );

  const accept = React.useMemo(
    () => ({
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }),
    []
  );

  return (
    <form className="py-12 px-16" onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold text-blue-900 font-barlow">
          Dados
        </h2>
      </div>

      <div className="flex items-center justify-start pt-6 pb-12 gap-x-10">
        <FormProvider {...form}>
          <div className="w-fit h-fit">
            <span className="text-gray-500 text-sm">Ícone</span>

            <div
              className={twMerge(
                `
                w-[120px]
                h-[120px]
                overflow-hidden
                mt-2
              `,
                isLoading && 'cursor-not-allowed pointer-events-none'
              )}
            >
              <FileInput
                className="w-[120px] h-[120px]"
                accept={accept}
                name="image"
              >
                <FiPlus size={14} color="#F25D27" />
              </FileInput>
            </div>

            {!!errors?.image && (
              <small className="text-[#F25D27] mt-2">
                {errors?.image?.message?.toString()}
              </small>
            )}
          </div>

          <Input
            id="name"
            label="Nome da categoria"
            disabled={isLoading}
            error={errors?.name}
            {...register('name')}
          />
        </FormProvider>
      </div>

      <div className="flex items-center justify-between">
        <div
          className="
          flex
          items-center
          justify-start
          gap-x-7
        "
        >
          <FiAlertCircle size={32} color="#F25D27" />

          <p
            className="
          text-[#617480]
            text-sm
          "
          >
            Preencha todos os <br />
            dados com cuidado.
          </p>
        </div>

        <Button type="submit" disabled={isLoading}>
          <div
            className="
            flex
            items-center
            justify-center
            gap-4"
          >
            <RotatingLines
              strokeColor="#fff"
              strokeWidth="3"
              animationDuration="0.95"
              width="24"
              visible={isLoading}
            />
            Concluir cadastro
          </div>
        </Button>
      </div>
    </form>
  );
};
