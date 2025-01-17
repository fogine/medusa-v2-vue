import {
    StoreRequestOrderTransfer,
    StoreOrderResponse,
} from '@medusajs/types';
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/vue-query';
import { orderKeys } from './queries';
import { useMedusa } from '../../../useApi';
import { buildOptions } from '../../utils/buildOptions';

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
  const queryClient = useQueryClient();

  return useMutation(
    (payload: StoreRequestOrderTransfer) =>
      client.store.order.requestTransfer(orderId, payload),
    buildOptions(queryClient, [orderKeys.all], options)
  );
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
  const queryClient = useQueryClient();

  return useMutation(
    () =>
      client.store.order.cancelTransfer(orderId),
    buildOptions(queryClient, [orderKeys.all], options)
  );
};
