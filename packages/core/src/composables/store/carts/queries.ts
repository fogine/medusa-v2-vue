import { queryKeysFactory } from '../../utils/index';
import { StoreCartResponse, SelectParams} from '@medusajs/types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import { UseQueryOptionsWrapper } from '../../../types';
import {MaybeRefOrGetter, toValue} from 'vue';

const CARTS_QUERY_KEY = `carts` as const;

const cartKeys = {
  ...queryKeysFactory<typeof CARTS_QUERY_KEY, SelectParams>(CARTS_QUERY_KEY),
};

type CartQueryKey = typeof cartKeys;

export const useGetCart = (
  id: MaybeRefOrGetter<string>,
  query?: MaybeRefOrGetter<SelectParams>,
  options?: UseQueryOptionsWrapper<
    StoreCartResponse,
    Error,
    ReturnType<CartQueryKey['detail']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: cartKeys.detail(id, query),
    queryFn: (_ctx) => client.store.cart.retrieve(toValue(id), toValue(query)),
    ...options
  });
  return { data, ...rest } as const;
};
