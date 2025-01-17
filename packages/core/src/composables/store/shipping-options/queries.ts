import { queryKeysFactory } from '../../utils/index';
import { UseQueryOptionsWrapper } from '../../../types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import {
    StoreGetShippingOptionList,
    StoreShippingOptionListResponse
} from '@medusajs/types';

const SHIPPING_OPTION_QUERY_KEY = `shipping_options` as const;

const shippingOptionKey = {
  ...queryKeysFactory(SHIPPING_OPTION_QUERY_KEY),
  cart: (cartId: string) => [...shippingOptionKey.all, 'cart', cartId] as const,
};

type ShippingOptionQueryKey = typeof shippingOptionKey;

export const useCartShippingOptions = (
  cartId: string,
  query?: StoreGetShippingOptionList,
  options?: UseQueryOptionsWrapper<
    StoreShippingOptionListResponse,
    Error,
    ReturnType<ShippingOptionQueryKey['cart']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    shippingOptionKey.cart(cartId),
    async () => client.store.fulfillment.listCartOptions({
        cart_id: cartId,
        ...query
    }),
    options
  );
  return { data, ...rest } as const;
};
