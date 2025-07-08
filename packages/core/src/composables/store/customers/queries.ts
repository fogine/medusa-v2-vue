import {
    StoreCustomerResponse,
    StoreOrderFilters,
    StoreOrderListResponse
} from '@medusajs/types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import { UseQueryOptionsWrapper } from '../../../types';
import { queryKeysFactory } from '../../utils/index';
import {MaybeRefOrGetter, toValue} from 'vue';

const CUSTOMERS_QUERY_KEY = `customers` as const;

export const customerKeys = {
  ...queryKeysFactory<typeof CUSTOMERS_QUERY_KEY, MaybeRefOrGetter<StoreOrderFilters>>(CUSTOMERS_QUERY_KEY),
};

type CustomerQueryKey = typeof customerKeys;

export const useMeCustomer = (
  options?: UseQueryOptionsWrapper<
    StoreCustomerResponse,
    Error,
    ReturnType<CustomerQueryKey['detail']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: customerKeys.detail('me'),
    queryFn: () => client.store.customer.retrieve(),
    ...options
  }
  );
  return { data, ...rest } as const;
};

export const useCustomerOrders = (
  query: MaybeRefOrGetter<StoreOrderFilters> = { limit: 10, offset: 0 },
  options?: UseQueryOptionsWrapper<
    StoreOrderListResponse,
    Error,
    ReturnType<CustomerQueryKey['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: customerKeys.list(query),
    queryFn: () => client.store.order.list(toValue(query)),
    ...options
  });

  return { data, ...rest } as const;
};
