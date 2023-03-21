import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


type stateType = {
    projectId?: string;
};

export const useQueryState = (initialState = {}): [stateType, (query?: {}) => void]  => {
  const router = useRouter();
  const [state, setState] = useState<stateType>(initialState);

  useEffect(() => {
    setState(router.query);
  }, [router.query]);

  const setQueryParams = (query = {}) => {
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  return [state, setQueryParams];
};