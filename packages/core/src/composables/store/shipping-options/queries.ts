import { queryKeysFactory } from "../../utils/index";
import { UseQueryOptionsWrapper } from "../../../types";
import { useQuery } from "@tanstack/vue-query";
import { useMedusa } from "../../../useApi";
import {
  StoreGetShippingOptionList,
  StoreShippingOptionListResponse,
} from "@medusajs/types";
import { MaybeRefOrGetter, toValue } from "vue";

const SHIPPING_OPTION_QUERY_KEY = `shipping_options` as const;

const shippingOptionKey = queryKeysFactory<
  typeof SHIPPING_OPTION_QUERY_KEY,
  MaybeRefOrGetter<StoreGetShippingOptionList>
>(SHIPPING_OPTION_QUERY_KEY);

type ShippingOptionQueryKey = typeof shippingOptionKey;

export const useCartShippingOptions = (
  query: MaybeRefOrGetter<StoreGetShippingOptionList>,
  options?: UseQueryOptionsWrapper<
    StoreShippingOptionListResponse,
    Error,
    ReturnType<ShippingOptionQueryKey["list"]>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: shippingOptionKey.list(query),
    queryFn: async (ctx) =>
      client.store.fulfillment.listCartOptions(toValue(ctx.queryKey[2].query)),
    ...options,
  });
  return { data, ...rest } as const;
};
