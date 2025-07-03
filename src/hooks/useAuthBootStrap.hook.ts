import { useEffect } from 'react';
import { useLazyUserQuery } from '@store/auth/endpoints';
import { useRootState } from '@/store/store';
import { selectAuth } from '@/store/auth/auth.selector';

export function useAuthBootstrap() {

  const remember_me = useRootState(selectAuth);
  const [userQuery] = useLazyUserQuery()

  useEffect(() => {
    if (remember_me && remember_me.access_token) {
      userQuery()
    }
  }, [])

  if (remember_me.isAuthenticated) {
    return true;
  }

  return false
}
