import { useOrder, useOrders } from '../../../../src/';
import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useOrder hook', () => {
  test('returns an order', async () => {
    const order = fixtures.get('order');

    const { vm } = createWrapperComponent(() => useOrder(order.id));

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.order).toEqual(order);
  });
});

describe('useOrders hook', () => {
  test('gets a list of orders', async () => {
    const { vm } = createWrapperComponent(() => useOrders());

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.orders).toEqual(fixtures.list('order', 5));
  });

  test('gets a list of orders based on limit and offset', async () => {
    const { vm } = createWrapperComponent(() =>
      useOrders({
        limit: 5,
        offset: 2,
      })
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.orders).toEqual(fixtures.list('order', 5));
    expect(vm.data?.limit).toEqual(5);
    expect(vm.data?.offset).toEqual(2);
  });
});
