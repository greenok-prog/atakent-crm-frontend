import type { UseFetchOptions } from "nuxt/app";
import { defu } from "defu";

export function useAPI<T, U = Record<string, any>, V = Record<string, any>>(
  url: any,
  options: UseApiOptions<T, U, V> = {}
) {
  const config = useRuntimeConfig();


  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseUrl,
    key: `${url}`,
    onResponse(_ctx) {},
    onResponseError({ response, request }) {},
  };

  const params = defu(options, defaults);

  return useFetch<T>(url, params as any);
}

type UseApiOptions<T, U = Record<string, any>, V = Record<string, any>> = Omit<
  UseFetchOptions<T>,
  "body" | "params"
> & {
  body?: U;
  params?: V;
};