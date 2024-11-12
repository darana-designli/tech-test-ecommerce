import { useRouter, useSearchParams } from 'next/navigation';

type QueryParams = Record<string, string | number | undefined>;

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams = Object.fromEntries(searchParams.entries());

  const setQueryParams = (params: QueryParams) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        newParams.delete(key); 
      } else {
        newParams.set(key, value.toString());
      }
    });

    router.push(`?${newParams.toString()}`);
  };

  return { queryParams, setQueryParams };
};
