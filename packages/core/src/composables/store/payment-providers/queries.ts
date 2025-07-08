import { queryKeysFactory } from '../../utils/index';
import { StorePaymentProviderFilters, FindParams, StorePaymentProviderListResponse } from '@medusajs/types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import { UseQueryOptionsWrapper } from '../../../types';
import {MaybeRefOrGetter, toValue} from 'vue';

const PAYMENT_PROVIDERS_QUERY_KEY = `payment_providers` as const;

const paymentProvidersKeys = {
  ...queryKeysFactory<typeof PAYMENT_PROVIDERS_QUERY_KEY, MaybeRefOrGetter<StorePaymentProviderFilters & FindParams>>(PAYMENT_PROVIDERS_QUERY_KEY),
};

type PaymentProvidersQueryKey = typeof paymentProvidersKeys;

export const useGetPaymentProviders = (
  query?: MaybeRefOrGetter<StorePaymentProviderFilters & FindParams>,
  options?: UseQueryOptionsWrapper<
    StorePaymentProviderListResponse,
    Error,
    ReturnType<PaymentProvidersQueryKey['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: paymentProvidersKeys.list(query),
    queryFn: (_ctx) => client.store.payment.listPaymentProviders(toValue(query)),
    ...options
  });
  return { data, ...rest } as const;
};
