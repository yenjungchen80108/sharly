import { fetcher } from '../fetch';
import useSWR from 'swr';
// https://swr.vercel.app/zh-CN/docs/getting-started
export function useCurrentUser() {
  return useSWR('/api/user', fetcher);
}

export function useUser(id) {
  return useSWR(`/api/users/${id}`, fetcher);
}
