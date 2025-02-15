import {
    StoreRequestOrderTransfer,
    StoreOrderResponse,
} from '@medusajs/types';
import {
  UseMutationOptions,
  useMutation,
} from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';

export const useRequestOrderTransfer = (
  orderId: string,
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
      client.store.order.requestTransfer(orderId, payload),
    ...options
  });
};

export const useCancelOrderTransfer = (
  orderId: string,
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
      client.store.order.cancelTransfer(orderId),
    ...options
  });
};
