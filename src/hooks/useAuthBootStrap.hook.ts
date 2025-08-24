import { useEffect } from 'react';
import { useLazyProfileQuery } from '@store/auth/endpoints';
import { useRootState } from '@/store/store';
import { selectIsAuthenticated, selectRememberMe } from '@/store/auth/auth.selector';

export function useAuthBootstrap() {

  const [userQuery] = useLazyProfileQuery();
  const authenticated = useRootState(selectIsAuthenticated);
  const isAuthenticated = authenticated;


  useEffect(() => {
    if (isAuthenticated) {
      userQuery();
    }
  }, []);

  return (isAuthenticated) || false;
}
