import { UseMutationOptions, useMutation } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import {StoreCartResponse, StoreCreateCart, StoreUpdateCart, StoreCompleteCartResponse, StorePaymentCollectionResponse, StoreCart, StoreInitializePaymentSession, StoreAddCartShippingMethods} from '@medusajs/types';

export const useCreateCart = (
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreCreateCart,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation(
    (data: StoreCreateCart) => client.store.cart.create(data),
    options
  );
};

export const useUpdateCart = (
  cartId: string,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreUpdateCart,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation(
    (data: StoreUpdateCart) => client.store.cart.update(cartId, data),
    options
  );
};

export const useCompleteCart = (
  cartId: string,
  options?: UseMutationOptions<StoreCompleteCartResponse, Error, void, unknown>
) => {
  const { client } = useMedusa();

  return useMutation(() => client.store.cart.complete(cartId), options);
};

export const useCreatePaymentSession = (
  cart: StoreCart,
  paymentOptions: StoreInitializePaymentSession,
  options?: UseMutationOptions<StorePaymentCollectionResponse, Error, void, unknown>
) => {
  const { client } = useMedusa();
  return useMutation(() => client.store.payment.initiatePaymentSession(cart, paymentOptions), options);
};

export const useAddShippingMethodToCart = (
  cartId: string,
  options?: UseMutationOptions<
    StoreCartResponse,
    Error,
    StoreAddCartShippingMethods,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation(
    (data: StoreAddCartShippingMethods) =>
      client.store.cart.addShippingMethod(cartId, data),
    options
  );
};
