import {
    StoreProductResponse,
    StoreProductListResponse,
    StoreProductListParams
} from '@medusajs/types';
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';

import { UseQueryOptionsWrapper, UseInfiniteQueryOptionsWrapper } from '../../../types';
import { queryKeysFactory } from '../../utils/index';

const PRODUCTS_QUERY_KEY = `products` as const;

export const productKeys = queryKeysFactory<
  typeof PRODUCTS_QUERY_KEY,
  StoreProductListParams
>(PRODUCTS_QUERY_KEY);
type ProductQueryKey = typeof productKeys;

export const useProducts = (
  query?: StoreProductListParams,
  options?: UseQueryOptionsWrapper<
    StoreProductListResponse,
    Error,
    ReturnType<ProductQueryKey['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: productKeys.list(query),
    queryFn: (ctx) => {
        const q = ctx.queryKey[2].query;//we access query like this because it should have all refs unwrapped
        return client.store.product.list(q)
    },
    ...options
  }
  );
  return { data, ...rest } as const;
};

export const useProduct = (
  id: string,
  options?: UseQueryOptionsWrapper<
    StoreProductResponse,
    Error,
    ReturnType<ProductQueryKey['detail']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: (ctx) => client.store.product.retrieve(ctx.queryKey[2]),
    ...options
  }
  );

  return { data, ...rest } as const;
};


export const useInfiniteProducts = (
  query?: StoreProductListParams,
  options?: UseInfiniteQueryOptionsWrapper<
    StoreProductListResponse,
    Error,
    ReturnType<ProductQueryKey['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useInfiniteQuery({
    queryKey: productKeys.list(query),
    queryFn: (ctx) => {
        const q = ctx.queryKey[2].query;//we access query like this because it should have all refs unwrapped
        const qq= Object.assign(q ?? {}, {offset: ctx.pageParam ?? 0});
        return client.store.product.list(qq);
    },
    initialPageParam: 0,
    getNextPageParam: function (lastPage:any, _pages:any): number {
      return lastPage.products.length < lastPage.limit ? undefined : lastPage.offset + lastPage.limit;
    },
    ...options
  });
  return { data, ...rest } as const;
};
