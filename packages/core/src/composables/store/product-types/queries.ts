import {
  AdminProductTypeListResponse,
  AdminProductTypeListParams,
} from "@medusajs/types";
import { useQuery } from "@tanstack/vue-query";
import { useMedusa } from "../../../useApi";
import { UseQueryOptionsWrapper } from "../../../types";
import { queryKeysFactory } from "../../utils";
import { MaybeRefOrGetter, toValue } from "vue";

const PRODUCT_TYPES_QUERY_KEY = `product_types` as const;

export const productTypeKeys = queryKeysFactory<
  typeof PRODUCT_TYPES_QUERY_KEY,
  MaybeRefOrGetter<AdminProductTypeListParams>
>(PRODUCT_TYPES_QUERY_KEY);

type ProductTypesQueryKeys = typeof productTypeKeys;

export const useProductTypes = (
  query?: MaybeRefOrGetter<AdminProductTypeListParams>,
  options?: UseQueryOptionsWrapper<
    AdminProductTypeListResponse,
    Error,
    ReturnType<ProductTypesQueryKeys["list"]>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: productTypeKeys.list(query),
    queryFn: (ctx) =>
      client.admin.productType.list(toValue(ctx.queryKey[2].query)),
    ...options,
  });
  return { data, ...rest } as const;
};
