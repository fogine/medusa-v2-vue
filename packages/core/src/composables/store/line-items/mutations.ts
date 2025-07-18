import {
  StoreCartResponse,
  StoreAddCartLineItem,
  StoreLineItemDeleteResponse,
  StoreUpdateCartLineItem,
  SelectParams,
} from "@medusajs/types";
import { useMutation, UseMutationOptions } from "@tanstack/vue-query";
import { useMedusa } from "../../../useApi";
import { MaybeRefOrGetter, toValue } from "vue";

export const useCreateLineItem = (
  cartId: MaybeRefOrGetter<string>,
  query?: MaybeRefOrGetter<SelectParams>,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreAddCartLineItem,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreAddCartLineItem) =>
      client.store.cart.createLineItem(toValue(cartId), data, toValue(query)),
    ...options,
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
    mutationFn: () =>
      client.store.cart.deleteLineItem(toValue(cartId), toValue(lineItemId)),
    ...options,
  });
};

export const useUpdateLineItem = (
  cartId: MaybeRefOrGetter<string>,
  lineItemId: MaybeRefOrGetter<string>,
  query?: MaybeRefOrGetter<SelectParams>,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreUpdateCartLineItem,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreUpdateCartLineItem) =>
      client.store.cart.updateLineItem(
        toValue(cartId),
        toValue(lineItemId),
        data,
        toValue(query)
      ),
    ...options,
  });
};
