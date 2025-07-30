import { SelectParams, StoreCalculateShippingOptionPrice, StoreShippingOptionResponse } from "@medusajs/types";
import { UseMutationOptions, useMutation } from "@tanstack/vue-query";
import { useMedusa } from "../../../useApi";
import { MaybeRefOrGetter, toValue } from "vue";

export const useCalculateShippingOptionPrice = (
  shippingOptionId: MaybeRefOrGetter<string>,
  query?: MaybeRefOrGetter<SelectParams>,
  options?: UseMutationOptions<StoreShippingOptionResponse, Error, StoreCalculateShippingOptionPrice, unknown>
) => {
  const { client } = useMedusa();

  return useMutation({
      mutationFn: (data:StoreCalculateShippingOptionPrice) => client.store.fulfillment.calculate(toValue(shippingOptionId), data, toValue(query)),
    ...options,
  });
};
