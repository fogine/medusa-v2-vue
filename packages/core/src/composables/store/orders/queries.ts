import { queryKeysFactory } from "../../utils/index";
import { StoreOrder } from "@medusajs/types";
import { useQuery } from "@tanstack/vue-query";
import { useMedusa } from "../../../useApi";
import { UseQueryOptionsWrapper } from "../../../types";
import { MaybeRefOrGetter, toValue } from "vue";

const ORDERS_QUERY_KEY = `orders` as const;

export const orderKeys = {
  ...queryKeysFactory<typeof ORDERS_QUERY_KEY, any>(ORDERS_QUERY_KEY),
  cart: (cartId: string) => [...orderKeys.details(), "cart", cartId] as const,
};

type OrderQueryKey = typeof orderKeys;

export const useOrder = (
  id: MaybeRefOrGetter<string>,
  options?: UseQueryOptionsWrapper<
    { order: StoreOrder },
    Error,
    ReturnType<OrderQueryKey["detail"]>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: (_ctx) => client.store.order.retrieve(toValue(id)),
    ...options,
  });

  return { data, ...rest } as const;
};
