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
    ReturnType<RegionQueryType['lists']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    regionsKey.lists(),
    () => client.store.region.list(query),
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
    () => client.store.region.retrieve(id),
    options
  );
  return { data, ...rest } as const;
};
