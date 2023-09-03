'use client';

import React from 'react';
import { FiAlertCircle, FiPlus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { FileInput } from '~/components/FileInput';
import { useSuccessModal } from '~/hooks/useSuccessModal';
import { Category } from '~/@types/types';
import { FileInputPreview } from '~/components/FileInputPreview';
import { useLoadImage } from '~/hooks/useLoadImage';

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
    )
    .optional(),
});

type CategoryFormData = zod.infer<typeof categoryFormValidationSchema>;

interface Props {
  data: Category[];
}

export const FormContent = ({ data }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showCategoryIcon, setShowCategoryIcon] = React.useState(false);
  const [isRequiredIcon, setIsRequiredIcon] = React.useState(false);

  const isDisabled = isLoading;

  const [category] = data;

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: category?.name,
    },
  });

  const { register, formState, handleSubmit, reset, watch } = form;

  const { errors } = formState;

  const iconUrl = useLoadImage(category);

  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const successModal = useSuccessModal();

  const updateCategoryIcon = React.useCallback(
    async (path: string, file: File) => {
      const { data, error } = await supabaseClient.storage
        .from('images')
        .update(path, file, {
          upsert: true,
        });

      return { data, error };
    },
    [supabaseClient]
  );

  const updateCategory = React.useCallback(
    async (id: string, name: string) => {
      const { error } = await supabaseClient
        .from('categories')
        .update({ name })
        .eq('id', id);

      return { error };
    },
    [supabaseClient]
  );

  const onSubmit: SubmitHandler<CategoryFormData> = React.useCallback(
    async (data) => {
      const iconFile = data?.image?.[0];

      if (!iconFile && isRequiredIcon) return toast.error('Ícone obrigatório');

      try {
        setIsLoading(true);

        if (iconFile) {
          const { error } = await updateCategoryIcon(
            category?.image_path,
            iconFile
          );

          if (error) {
            setIsLoading(false);

            return toast.error('Ocorreu um erro!');
          }
        }

        const { error } = await updateCategory(category?.id, data?.name);

        if (error) {
          setIsLoading(false);

          return toast.error(error?.message);
        }

        setIsLoading(false);

        toast.success('Atualizado com sucesso!');

        router.refresh();

        return router.push('/categories');
      } catch (error) {
        toast.error('Ocorreu um erro');
      } finally {
        setIsLoading(false);
      }
    },
    [isRequiredIcon, category, updateCategoryIcon, updateCategory, router]
  );

  const accept = React.useMemo(
    () => ({
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }),
    []
  );

  const handleChangeIcon = React.useCallback(() => {
    setShowCategoryIcon(false);
    setIsRequiredIcon(true);
  }, []);

  React.useEffect(() => {
    setShowCategoryIcon(!!category?.image_path);
  }, [category]);

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
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Ícone</span>
              <span className="text-gray-500 text-sm">64x64px</span>
            </div>

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
              {showCategoryIcon ? (
                <FileInputPreview url={iconUrl} removeFile={handleChangeIcon} />
              ) : (
                <FileInput
                  className="w-[120px] h-[120px]"
                  accept={accept}
                  name="image"
                >
                  <FiPlus size={14} color="#F25D27" />
                </FileInput>
              )}
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
            disabled={isDisabled}
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
          text-gray-500
            text-sm
          "
          >
            Preencha todos os <br />
            dados com cuidado.
          </p>
        </div>

        <Button type="submit" disabled={isDisabled}>
          <div
            className="
            flex
            items-center
            justify-center
            gap-4
          "
          >
            <RotatingLines
              strokeColor="#fff"
              strokeWidth="3"
              animationDuration="0.95"
              width="24"
              visible={isLoading}
            />
            Atualizar categoria
          </div>
        </Button>
      </div>
    </form>
  );
};
