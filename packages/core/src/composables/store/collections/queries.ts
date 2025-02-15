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
  const { data, ...rest } = useQuery({
    queryKey: collectionKeys.detail(id),
    queryFn: (ctx) => client.store.collection.retrieve(ctx.queryKey[2]),
    ...options
  }
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
  const { data, ...rest } = useQuery({
    queryKey: collectionKeys.list(query),
    queryFn: (ctx) => client.store.collection.list(ctx.queryKey[2].query),
    ...options
  }
  );
  return { data, ...rest } as const;
};
