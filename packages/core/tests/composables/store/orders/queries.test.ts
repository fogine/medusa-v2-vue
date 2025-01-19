import { useOrder } from '../../../../src/';
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
