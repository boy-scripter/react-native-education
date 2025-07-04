import { useEffect } from 'react';
import { useLazyUserQuery } from '@store/auth/endpoints';
import { useRootState } from '@/store/store';
import {  selectIsAuthenticated } from '@/store/auth/auth.selector';

export function useAuthBootstrap() {

  const isAuthenticated = useRootState(selectIsAuthenticated);
  const [userQuery] = useLazyUserQuery()

  useEffect(() => {
    if (isAuthenticated) {
      userQuery()
    }
  }, [])

  return isAuthenticated || false;
}
