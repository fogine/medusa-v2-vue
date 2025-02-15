import { queryKeysFactory } from '../../utils/index';
import { StoreCartResponse, StorePaymentProviderFilters, FindParams, StorePaymentProviderListResponse } from '@medusajs/types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import { UseQueryOptionsWrapper } from '../../../types';

const CARTS_QUERY_KEY = `carts` as const;

const cartKeys = {
  ...queryKeysFactory<typeof CARTS_QUERY_KEY, StorePaymentProviderFilters & FindParams>(CARTS_QUERY_KEY),
    paymentProviders: (query?: StorePaymentProviderFilters & FindParams) => [...cartKeys.list(), 'payment_providers', { query }, ] as const,
};

type CartQueryKey = typeof cartKeys;

export const useGetCart = (
  id: string,
  options?: UseQueryOptionsWrapper<
    StoreCartResponse,
    Error,
    ReturnType<CartQueryKey['detail']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: cartKeys.detail(id),
    queryFn: (ctx) => client.store.cart.retrieve(ctx.queryKey[2]),
    ...options
  });
  return { data, ...rest } as const;
};

export const useGetPaymentProviders = (
  query?: StorePaymentProviderFilters & FindParams,
  options?: UseQueryOptionsWrapper<
    StorePaymentProviderListResponse,
    Error,
    ReturnType<CartQueryKey['paymentProviders']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: cartKeys.paymentProviders(query),
    queryFn: (ctx) => client.store.payment.listPaymentProviders(ctx.queryKey[2].query),
    ...options
  });
  return { data, ...rest } as const;
};
