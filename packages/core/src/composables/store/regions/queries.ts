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
import {MaybeRefOrGetter, toValue} from 'vue';

const REGIONS_QUERY_KEY = `regions` as const;

const regionsKey = queryKeysFactory<typeof REGIONS_QUERY_KEY, MaybeRefOrGetter<StoreRegionFilters & FindParams>>(REGIONS_QUERY_KEY);

type RegionQueryType = typeof regionsKey;

export const useRegions = (
  query?: MaybeRefOrGetter<StoreRegionFilters & FindParams>,
  options?: UseQueryOptionsWrapper<
    StoreRegionListResponse,
    Error,
    ReturnType<RegionQueryType['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: regionsKey.list(query),
    queryFn: (_ctx) => client.store.region.list(toValue(query)),
    ...options
  });

  return { data, ...rest } as const;
};

export const useRegion = (
  id: MaybeRefOrGetter<string>,
  options?: UseQueryOptionsWrapper<
    StoreRegionResponse,
    Error,
    ReturnType<RegionQueryType['detail']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: regionsKey.detail(id),
    queryFn: (_ctx) => client.store.region.retrieve(toValue(id)),
    ...options
  });
  return { data, ...rest } as const;
};
