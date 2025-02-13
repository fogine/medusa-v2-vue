import {
    StoreCustomerResponse,
    StoreOrderFilters,
    StoreOrderListResponse
} from '@medusajs/types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import { UseQueryOptionsWrapper } from '../../../types';
import { queryKeysFactory } from '../../utils/index';

const CUSTOMERS_QUERY_KEY = `customers` as const;

export const customerKeys = {
  ...queryKeysFactory<typeof CUSTOMERS_QUERY_KEY, StoreOrderFilters>(CUSTOMERS_QUERY_KEY),
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
  const { data, ...rest } = useQuery(
    customerKeys.detail('me'),
    () => client.store.customer.retrieve(),
    options
  );
  return { data, ...rest } as const;
};

export const useCustomerOrders = (
  query: StoreOrderFilters = { limit: 10, offset: 0 },
  options?: UseQueryOptionsWrapper<
    StoreOrderListResponse,
    Error,
    ReturnType<CustomerQueryKey['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    customerKeys.list(query),
    () => client.store.order.list(query),
    options
  );

  return { data, ...rest } as const;
};
