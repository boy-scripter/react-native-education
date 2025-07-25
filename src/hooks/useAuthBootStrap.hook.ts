import { useEffect } from 'react';
import { useLazyProfileQuery } from '@store/auth/endpoints';
import { useRootState } from '@/store/store';
import { selectIsAuthenticated, selectRememberMe } from '@/store/auth/auth.selector';

export function useAuthBootstrap() {

  const authenticated = useRootState(selectIsAuthenticated);
  const rememberMe = useRootState(selectRememberMe);
  const isAuthenticated = authenticated && rememberMe

  const [userQuery] = useLazyProfileQuery()

  useEffect(() => {
    if (isAuthenticated) {
      userQuery()
    }
  }, [])

  return (isAuthenticated) || false;
}
