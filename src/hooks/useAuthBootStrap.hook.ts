import { useStorage } from './useStorage.hook';
import { useAppDispatch } from '@/store/store';
import { setAuthState } from '@/store/auth/auth.slice';
import { AuthenticatedUser, AuthState, REMEMBER_ME } from '@/types/auth';
import { useEffect } from 'react';
import { useUserQuery } from '@/graphql/generated';

const { getItem } = useStorage();

export function useAuthBootstrap() {
  const dispatch = useAppDispatch();
  const userQuery = useUserQuery();

  const remember_me = getItem<AuthState>(REMEMBER_ME);

  useEffect(() => {
    if (remember_me && remember_me.access_token) {
       useUserQuery();
    }
  }, [])

  if (remember_me) {
    dispatch(setAuthState(remember_me as AuthenticatedUser));
    return true;
  }

  return false
}
