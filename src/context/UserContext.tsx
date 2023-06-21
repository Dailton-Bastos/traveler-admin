'use client';

import React from 'react';

import { User } from '@supabase/auth-helpers-nextjs';
import {
  useSessionContext,
  useUser as useSupabaseUser,
} from '@supabase/auth-helpers-react';
import { UserInfo } from '~/@types/types';
import { toast } from 'react-hot-toast';

interface UserContextData {
  accessToken: string | null;
  user: User | null;
  userInfo: UserInfo | null;
  isLoading: boolean;
}

interface UserContextProviderData {
  children: React.ReactNode;
}

export const UserContext = React.createContext({} as UserContextData);

export const UserProvider = ({ children }: UserContextProviderData) => {
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);

  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
  } = useSessionContext();

  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;

  const getUserInfo = React.useCallback(async () => {
    setIsLoadingData(true);

    try {
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .single();

      if (error) {
        toast.error('Error to get user infos');
        setIsLoadingData(false);
        setUserInfo(null);
        throw new Error(error?.message);
      }

      if (data) {
        setUserInfo(data);
      }
    } catch (error) {
      setIsLoadingData(false);
      setUserInfo(null);
    } finally {
      setIsLoadingData(false);
    }
  }, [supabaseClient]);

  React.useEffect(() => {
    if (user) {
      getUserInfo();
    } else if (!user) {
      setUserInfo(null);
    }
  }, [user, getUserInfo]);

  const values = React.useMemo(
    () => ({
      accessToken,
      user,
      userInfo,
      isLoading: isLoadingUser || isLoadingData,
    }),
    [accessToken, user, userInfo, isLoadingUser, isLoadingData]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
