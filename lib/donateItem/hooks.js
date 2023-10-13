import { fetcher } from "../fetch";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

export function useDonateItems(limit) {
  const { data, error } = useSWR(
    `/api/donateItems?limit=${limit ?? Number.MAX_SAFE_INTEGER}`,
    fetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
/*
export function useDonateItemsPages({ partnerId, limit = 5 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.partners.length === 0) return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      if (partnerId) searchParams.set('by', partnerId);

      if (index !== 0) {
        // using oldest posts createdAt date as cursor
        // We want to fetch posts which has a date that is
        // before (hence the .getTime()) the last post's createdAt
        const before = new Date(
          new Date(
            previousPageData.partners[previousPageData.partners.length - 1].createdAt
          ).getTime()
        );

        searchParams.set('before', before.toJSON());
      }

      return `/api/donateItems?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 20000,
      revalidateAll: false,
    }
  );
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.message?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.partners?.length < limit);
  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
*/
export function useDonateItem({ donateItemId }) {
  const { data, error } = useSWR(`/api/donateItems/${donateItemId}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useDonateItemsPages(index) {
  const { data, size, setSize, error } = useSWR(
    `/api/donateItems?page=${index}`,
    fetcher,
    {
      initialData: data,
      revalidateOnMount: true,
    }
  );
  return {
    data: data,
    isLoading: !error && !data,
  };
}
