import {
    AdminProductTypeListResponse,
    AdminProductTypeListParams,
} from '@medusajs/types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import { UseQueryOptionsWrapper } from '../../../types';
import { queryKeysFactory } from '../../utils';

const PRODUCT_TYPES_QUERY_KEY = `product_types` as const;

export const productTypeKeys = queryKeysFactory(PRODUCT_TYPES_QUERY_KEY);

type ProductTypesQueryKeys = typeof productTypeKeys;

export const useProductTypes = (
  query?: AdminProductTypeListParams,
  options?: UseQueryOptionsWrapper<
    AdminProductTypeListResponse,
    Error,
    ReturnType<ProductTypesQueryKeys['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    productTypeKeys.list(query),
    () => client.admin.productType.list(query),
    options
  );
  return { data, ...rest } as const;
};
