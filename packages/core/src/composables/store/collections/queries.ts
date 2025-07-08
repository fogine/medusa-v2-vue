import {
  StoreCollectionResponse,
  StoreCollectionFilters,
  StoreCollectionListResponse,
  FindParams,
} from "@medusajs/types";
import { useQuery } from "@tanstack/vue-query";
import { useMedusa } from "../../../useApi";
import { UseQueryOptionsWrapper } from "../../../types";
import { queryKeysFactory } from "../../utils/index";
import { MaybeRefOrGetter, toValue } from "vue";

const COLLECTIONS_QUERY_KEY = `collections` as const;

export const collectionKeys = queryKeysFactory(COLLECTIONS_QUERY_KEY);

type CollectionQueryKey = typeof collectionKeys;

export const useCollection = (
  id: MaybeRefOrGetter<string>,
  options?: UseQueryOptionsWrapper<
    StoreCollectionResponse,
    Error,
    ReturnType<CollectionQueryKey["detail"]>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: collectionKeys.detail(id),
    queryFn: (_ctx) => client.store.collection.retrieve(toValue(id)),
    ...options,
  });
  return { data, ...rest } as const;
};

export const useCollections = (
  query?: MaybeRefOrGetter<StoreCollectionFilters & FindParams>,
  options?: UseQueryOptionsWrapper<
    StoreCollectionListResponse,
    Error,
    ReturnType<CollectionQueryKey["list"]>
  >
) => {
  const { client } = useMedusa();
  const { data, ...rest } = useQuery({
    queryKey: collectionKeys.list(query),
    queryFn: (ctx) =>
      client.store.collection.list(toValue(ctx.queryKey[2].query)),
    ...options,
  });
  return { data, ...rest } as const;
};
