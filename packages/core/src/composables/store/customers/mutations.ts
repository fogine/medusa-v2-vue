import {
    StoreCreateCustomer,
    StoreCustomerResponse,
    StoreUpdateCustomer,
} from '@medusajs/types';
import { useMutation, UseMutationOptions } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';

export const useCreateCustomer = (
  options?: UseMutationOptions<
    StoreCustomerResponse,
    Error,
    StoreCreateCustomer,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation(
    (data: StoreCreateCustomer) => client.store.customer.create(data),
    options
  );
};

export const useUpdateMe = (
  options?: UseMutationOptions<
    StoreCustomerResponse,
    Error,
    { id: string } & StoreUpdateCustomer,
    unknown
  >
) => {
  const { client } = useMedusa();
  return useMutation(
    (data: StoreUpdateCustomer) =>
      client.store.customer.update(data),
    options
  );
};
