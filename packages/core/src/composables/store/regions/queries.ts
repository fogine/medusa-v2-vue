import { queryKeysFactory } from '../../utils/index';
import { UseQueryOptionsWrapper } from '../../../types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import {
    StoreRegionFilters,
    FindParams,
    StoreRegionListResponse,
    StoreRegionResponse
} from '@medusajs/types';

const REGIONS_QUERY_KEY = `regions` as const;

const regionsKey = queryKeysFactory<typeof REGIONS_QUERY_KEY, StoreRegionFilters & FindParams>(REGIONS_QUERY_KEY);

type RegionQueryType = typeof regionsKey;

export const useRegions = (
  query?: StoreRegionFilters & FindParams,
  options?: UseQueryOptionsWrapper<
    StoreRegionListResponse,
    Error,
    ReturnType<RegionQueryType['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    regionsKey.list(query),
    (ctx) => client.store.region.list(ctx.queryKey[2].query),
    options
  );

  return { data, ...rest } as const;
};

export const useRegion = (
  id: string,
  options?: UseQueryOptionsWrapper<
    StoreRegionResponse,
    Error,
    ReturnType<RegionQueryType['detail']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    regionsKey.detail(id),
    (ctx) => client.store.region.retrieve(ctx.queryKey[2]),
    options
  );
  return { data, ...rest } as const;
};
