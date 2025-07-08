import { UseMutationOptions, useMutation } from "@tanstack/vue-query";
import { useMedusa } from "../../../useApi";
import {
  StoreCartResponse,
  StoreCreateCart,
  StoreUpdateCart,
  StoreCompleteCartResponse,
  StorePaymentCollectionResponse,
  StoreCart,
  StoreInitializePaymentSession,
  StoreAddCartShippingMethods,
} from "@medusajs/types";
import { MaybeRefOrGetter, toValue } from "vue";

export const useCreateCart = (
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreCreateCart,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreCreateCart) => client.store.cart.create(data),
    ...options,
  });
};

export const useUpdateCart = (
  cartId: MaybeRefOrGetter<string>,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreUpdateCart,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreUpdateCart) =>
      client.store.cart.update(toValue(cartId), data),
    ...options,
  });
};

export const useCompleteCart = (
  cartId: MaybeRefOrGetter<string>,
  options?: UseMutationOptions<StoreCompleteCartResponse, Error, void, unknown>
) => {
  const { client } = useMedusa();

  return useMutation({
    mutationFn: () => client.store.cart.complete(toValue(cartId)),
    ...options,
  });
};

export const useCreatePaymentSession = (
  cart: MaybeRefOrGetter<StoreCart>,
  paymentOptions: StoreInitializePaymentSession,
  options?: UseMutationOptions<
    StorePaymentCollectionResponse,
    Error,
    void,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: () =>
      client.store.payment.initiatePaymentSession(
        toValue(cart),
        paymentOptions
      ),
    ...options,
  });
};

export const useAddShippingMethodToCart = (
  cartId: MaybeRefOrGetter<string>,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreAddCartShippingMethods,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation({
    mutationFn: (data: StoreAddCartShippingMethods) =>
      client.store.cart.addShippingMethod(toValue(cartId), data),
    ...options,
  });
};
