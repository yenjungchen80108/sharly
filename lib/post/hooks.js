import { fetcher } from '../fetch';
import useSWRInfinite from 'swr/infinite';

export function usePostPages({ creatorId, limit = 5 } = {}) {
  // useSWRInfinite 讓我們可以利用一個 hook 進行多個 request 資料保存動作，
  // 與一般的 useSWR 不同，useSWR 抓取的是該 key 的資料，而 useSWRInfinite 則是抓取到該 key 之前所有資料的集合
  // https://medium.com/starbugs/swr-%E9%9A%B1%E8%97%8F%E7%89%88%E5%88%B7%E5%AD%90-useswrinfinite-e1f672af47e1
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.posts.length === 0) return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      if (creatorId) searchParams.set('by', creatorId);

      if (index !== 0) {
        // using oldest posts createdAt date as cursor
        // We want to fetch posts which has a date that is
        // before (hence the .getTime()) the last post's createdAt
        const before = new Date(
          new Date(
            previousPageData.posts[previousPageData.posts.length - 1].createdAt
          ).getTime()
        );

        searchParams.set('before', before.toJSON());
      }

      return `/api/posts?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.message?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts?.length < limit);
  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
