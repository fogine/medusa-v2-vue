import {StoreCartResponse, StoreAddCartLineItem, StoreLineItemDeleteResponse, StoreUpdateCartLineItem} from '@medusajs/types';
import { useMutation, UseMutationOptions } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';

export const useCreateLineItem = (
  cartId: string,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreAddCartLineItem,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreAddCartLineItem) => client.store.cart.createLineItem(cartId, data),
    ...options
  });
};

export const useDeleteLineItem = (
  cartId: string,
  lineItemId: string,
  options?: UseMutationOptions<
    StoreLineItemDeleteResponse,
    Error,
    void,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: () => client.store.cart.deleteLineItem(cartId, lineItemId),
    ...options
  });
};

export const useUpdateLineItem = (
  cartId: string,
  lineItemId: string,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreUpdateCartLineItem,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreUpdateCartLineItem) => client.store.cart.updateLineItem(cartId, lineItemId, data),
    ...options
  });
};
