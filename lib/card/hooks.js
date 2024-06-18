import { fetcher } from "../fetch";
import useSWR from "swr";

export function useCards() {
  const { data, error } = useSWR("/api/cards", fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCard({ cardId }) {
  return useSWR(`/api/cards/${cardId}`, fetcher);
}

export function useCardPages(index) {
  const { data, size, setSize, error } = useSWR(
    `/api/cards?page=${index}`,
    fetcher,
    {
      initialData: data,
      revalidateOnMount: true,
    }
  );
  return {
    data,
    isLoading: !error && !data,
  };
}
