import {
  StoreProductResponse,
  StoreProductListResponse,
  StoreProductListParams,
} from "@medusajs/types";
import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import { useMedusa } from "../../../useApi";

import {
  UseQueryOptionsWrapper,
  UseInfiniteQueryOptionsWrapper,
} from "../../../types";
import { queryKeysFactory } from "../../utils/index";
import { MaybeRefOrGetter, toValue } from "vue";

const PRODUCTS_QUERY_KEY = `products` as const;

export const productKeys = queryKeysFactory<
  typeof PRODUCTS_QUERY_KEY,
  MaybeRefOrGetter<StoreProductListParams>
>(PRODUCTS_QUERY_KEY);
type ProductQueryKey = typeof productKeys;

export const useProducts = (
  query?: MaybeRefOrGetter<StoreProductListParams>,
  options?: UseQueryOptionsWrapper<
    StoreProductListResponse,
    Error,
    ReturnType<ProductQueryKey["list"]>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: productKeys.list(query),
    queryFn: (ctx) => {
      const q = ctx.queryKey[2].query; //we access query like this because it should have all refs recursivelly unwrapped as opposed to using toValue(query)
      return client.store.product.list(toValue(q));
    },
    ...options,
  });
  return { data, ...rest } as const;
};

export const useProduct = (
  id: string,
  options?: UseQueryOptionsWrapper<
    StoreProductResponse,
    Error,
    ReturnType<ProductQueryKey["detail"]>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: (_ctx) => client.store.product.retrieve(toValue(id)),
    ...options,
  });

  return { data, ...rest } as const;
};

export const useInfiniteProducts = (
  query?: MaybeRefOrGetter<StoreProductListParams>,
  options?: UseInfiniteQueryOptionsWrapper<
    StoreProductListResponse,
    Error,
    ReturnType<ProductQueryKey["list"]>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useInfiniteQuery({
    queryKey: productKeys.list(query),
    queryFn: (ctx) => {
      const q = ctx.queryKey[2].query; //we access query like this because it should have all refs unwrapped
      const qq = Object.assign(q ?? {}, { offset: ctx.pageParam ?? 0 });
      return client.store.product.list(qq);
    },
    initialPageParam: 0,
    getNextPageParam: function (lastPage, _pages): number | null {
      return lastPage.products.length < lastPage.limit
        ? null
        : lastPage.offset + lastPage.limit;
    },
    ...options,
  });
  return { data, ...rest } as const;
};
