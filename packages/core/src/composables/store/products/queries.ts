import {
    StoreProductResponse,
    StoreProductListResponse,
    StoreProductListParams
} from '@medusajs/types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';

import { UseQueryOptionsWrapper } from '../../../types';
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
  const { data, ...rest } = useQuery(
    productKeys.list(query),
    (ctx) => {
        const q = ctx.queryKey[2].query;//we access query like this because it should have all refs unwrapped
        return client.store.product.list(q)
    },
    options
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
  const { data, ...rest } = useQuery(
    productKeys.detail(id),
    (ctx) => client.store.product.retrieve(ctx.queryKey[2]),
    options
  );

  return { data, ...rest } as const;
};
