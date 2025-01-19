import { fixtures } from '../../../../mocks/data';
import { useGetCart } from '../../../../src';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useGetCart hook', () => {
  test('returns a cart', async () => {
    const cart = fixtures.get('cart');
    const { vm } = createWrapperComponent(() => useGetCart(cart.id));

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.cart).toEqual(cart);
  });
});
