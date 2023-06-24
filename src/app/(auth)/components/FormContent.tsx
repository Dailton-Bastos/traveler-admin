'use client';

import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as zod from 'zod';

import { Input } from './Input';
import { InputPassword } from './InputPassword';
import { InputCheckbox } from './InputCheckbox';

const signInFormValidationSchema = zod.object({
  email: zod
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email({
      message: 'E-mail inválido',
    }),

  password: zod
    .string({
      required_error: 'Senha obrigatória',
    })
    .min(1, { message: 'Digite sua senha' }),
  keepLogged: zod.boolean().optional(),
});

type SignInFormData = zod.infer<typeof signInFormValidationSchema>;

export const FormContent = () => {
  const router = useRouter();

  const supabaseClient = useSupabaseClient();

  const { register, watch, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      keepLogged: false,
    },
  });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<SignInFormData> = React.useCallback(
    async (values) => {
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          ...values,
        });

        if (error) {
          return toast.error(error?.message);
        }

        if (data) {
          toast.success('Login com sucesso!');

          router.refresh();
          router.replace('/cities');
        }
      } catch (error) {
        toast.error('Ocorreu um erro!');
      }
    },
    [router, supabaseClient]
  );

  const email = watch('email');
  const password = watch('password');
  const keepLogged = watch('keepLogged');

  const isSubmitDisabled = !email || !password || isSubmitting;

  return (
    <form
      className="flex flex-col w-full mt-11"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="
          flex
          flex-col
          rounded-lg
        bg-white
          border
        border-gray-300
          overflow-hidden
          divide-y
          divide-gray-300
        "
      >
        <Input
          id="email"
          label="E-mail"
          filled={!!email}
          error={!!errors?.email?.message}
          {...register('email')}
        />

        <InputPassword
          id="password"
          label="Senha"
          filled={!!password}
          error={!!errors?.password?.message}
          {...register('password')}
        />
      </div>

      {errors?.email && (
        <p className="text-sm text-red-600 mt-2">{errors?.email?.message}</p>
      )}

      {errors?.password && (
        <p className="text-sm text-red-600">{errors?.password?.message}</p>
      )}

      <div
        className="
          flex
          items-center
          justify-between
          mt-6
          mb-8
          w-full
        "
      >
        <InputCheckbox keepLogged={keepLogged} {...register('keepLogged')} />

        <Link
          href="/forgot"
          className="
            text-[#A0ACB2]
            hover:text-neutral-500
            transition
          "
        >
          Esqueci minha senha
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="
          flex
          items-center
          justify-center
          gap-4
          text-white
          bg-[#F25D27]
          cursor-pointer
          rounded-lg
          text-lg
          font-medium
          disabled:opacity-50
          disabled:cursor-not-allowed
          hover:bg-orange-600
          transition
          h-[72px]
        "
      >
        <RotatingLines
          strokeColor="#fff"
          strokeWidth="3"
          animationDuration="0.95"
          width="30"
          visible={isSubmitting}
        />
        Acessar plataforma
      </button>

      <div
        className="
          flex
          items-center
          justify-start
          gap-x-7
          mt-20
        "
      >
        <FiAlertCircle size={32} color="#F25D27" />

        <p
          className="
            text-[#617480]
            text-sm
          "
        >
          Acesso restrito à<br />
          sócios e moderadores
        </p>
      </div>
    </form>
  );
};
