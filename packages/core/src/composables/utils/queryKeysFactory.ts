import {MaybeRefOrGetter} from 'vue';
import { TQueryKey } from '../../types';

export const queryKeysFactory = <
  T,
  TListQueryType = MaybeRefOrGetter<any>,
  TDetailKeyType = MaybeRefOrGetter<string>,
  TDetailQueryType = MaybeRefOrGetter<any>,
>(
  globalKey: T
) => {
  const queryKeyFactory: TQueryKey<T, TListQueryType, TDetailKeyType, TDetailQueryType> = {
    all: [globalKey],
    lists: () => [...queryKeyFactory.all, 'list'],
    list: (query?: TListQueryType) => [...queryKeyFactory.lists(), { query }],
    details: () => [...queryKeyFactory.all, 'detail'],
    detail: (id: TDetailKeyType, query?: TDetailQueryType) => [...queryKeyFactory.details(), id, { query }],
  };
  return queryKeyFactory;
};
