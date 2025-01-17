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
  const { data, ...rest } = useQuery(
    cartKeys.detail(id),
    () => client.store.cart.retrieve(id),
    options
  );
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
  const { data, ...rest } = useQuery(
    cartKeys.paymentProviders(query),
    () => client.store.payment.listPaymentProviders(query),
    options
  );
  return { data, ...rest } as const;
};
