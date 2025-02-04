import {
    StoreCollectionResponse,
    StoreCollectionFilters,
    StoreCollectionListResponse,
    FindParams
} from '@medusajs/types';
import { useQuery } from '@tanstack/vue-query';
import { useMedusa } from '../../../useApi';
import { UseQueryOptionsWrapper } from '../../../types';
import { queryKeysFactory } from '../../utils/index';

const COLLECTIONS_QUERY_KEY = `collections` as const;

export const collectionKeys = queryKeysFactory(COLLECTIONS_QUERY_KEY);

type CollectionQueryKey = typeof collectionKeys;

export const useCollection = (
  id: string,
  options?: UseQueryOptionsWrapper<
    StoreCollectionResponse,
    Error,
    ReturnType<CollectionQueryKey['detail']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    collectionKeys.detail(id),
    () => client.store.collection.retrieve(id),
    options
  );
  return { data, ...rest } as const;
};

export const useCollections = (
  query?: StoreCollectionFilters & FindParams,
  options?: UseQueryOptionsWrapper<
    StoreCollectionListResponse,
    Error,
    ReturnType<CollectionQueryKey['list']>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery(
    collectionKeys.list(query),
    () => client.store.collection.list(query),
    options
  );
  return { data, ...rest } as const;
};
