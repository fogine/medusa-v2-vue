import {StoreCartResponse, StoreAddCartLineItem, StoreLineItemDeleteResponse, StoreUpdateCartLineItem} from '@medusajs/types';
import { useMutation, UseMutationOptions } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import {MaybeRefOrGetter, toValue} from 'vue';

export const useCreateLineItem = (
  cartId: MaybeRefOrGetter<string>,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreAddCartLineItem,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreAddCartLineItem) => client.store.cart.createLineItem(toValue(cartId), data),
    ...options
  });
};

export const useDeleteLineItem = (
  cartId: MaybeRefOrGetter<string>,
  lineItemId: MaybeRefOrGetter<string>,
  options?: UseMutationOptions<
    StoreLineItemDeleteResponse,
    Error,
    void,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: () => client.store.cart.deleteLineItem(toValue(cartId), toValue(lineItemId)),
    ...options
  });
};

export const useUpdateLineItem = (
  cartId: MaybeRefOrGetter<string>,
  lineItemId: MaybeRefOrGetter<string>,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreUpdateCartLineItem,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreUpdateCartLineItem) => client.store.cart.updateLineItem(toValue(cartId), toValue(lineItemId), data),
    ...options
  });
};
