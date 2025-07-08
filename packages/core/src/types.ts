import {StoreProductVariant, StoreRegion} from '@medusajs/types';
import { QueryKey, UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/vue-query';
import {MaybeRefOrGetter} from 'vue';

export type UseQueryOptionsWrapper<
  // Return type of queryFn
  TQueryFn = unknown,
  // Type thrown in case the queryFn rejects
  E = Error,
  // Query key type
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<TQueryFn, E, TQueryFn, TQueryKey>,
  'queryKey' | 'queryFn' | 'select' | 'refetchInterval'
>;


export type UseInfiniteQueryOptionsWrapper<
  // Return type of queryFn
  TQueryFn = unknown,
  // Type thrown in case the queryFn rejects
  E = Error,
  // Query key type
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseInfiniteQueryOptions<TQueryFn, E, TQueryFn, TQueryFn, TQueryKey, number>,
  'queryKey' | 'queryFn' | 'select' | 'refetchInterval' | 'getNextPageParam'
> & Partial<Pick<UseInfiniteQueryOptions<TQueryFn, E, TQueryFn, TQueryFn, TQueryKey, number>, 'getNextPageParam' | 'queryKey'>>;

export type ProductVariantInfo = Pick<StoreProductVariant, 'calculated_price'>;

export type RegionInfo = Pick<StoreRegion, 'currency_code' | 'automatic_taxes'>;

export type TQueryKey<TKey, TListQuery = MaybeRefOrGetter<any>, TDetailKey = MaybeRefOrGetter<string>, TDetailQueryType = MaybeRefOrGetter<any>> = {
  all: [TKey];
  lists: () => [...TQueryKey<TKey>['all'], 'list'];
  list: (
    query?: TListQuery
  ) => [
    ...ReturnType<TQueryKey<TKey>['lists']>,
    { query: TListQuery | undefined }
  ];
  details: () => [...TQueryKey<TKey>['all'], 'detail'];
  detail: (
    id: TDetailKey,
    query?: TDetailQueryType | undefined
  ) => [...ReturnType<TQueryKey<TKey>['details']>, TDetailKey, { query: TDetailQueryType | undefined}];
};
