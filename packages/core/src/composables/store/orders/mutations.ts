import {
    StoreRequestOrderTransfer,
    StoreOrderResponse,
} from '@medusajs/types';
import {
  UseMutationOptions,
  useMutation,
} from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import {MaybeRefOrGetter, toValue} from 'vue';

export const useRequestOrderTransfer = (
  orderId: MaybeRefOrGetter<string>,
  options?: UseMutationOptions<
    StoreOrderResponse,
    Error,
    StoreRequestOrderTransfer,
    unknown
  >
) => {
  const { client } = useMedusa();

  return useMutation({
    mutationFn: (payload: StoreRequestOrderTransfer) =>
      client.store.order.requestTransfer(toValue(orderId), payload),
    ...options
  });
};

export const useCancelOrderTransfer = (
  orderId: MaybeRefOrGetter<string>,
  options?: UseMutationOptions<
    StoreOrderResponse,
    Error,
    void,
    unknown
  >
) => {
  const { client } = useMedusa();

  return useMutation({
    mutationFn: () =>
      client.store.order.cancelTransfer(toValue(orderId)),
    ...options
  });
};
