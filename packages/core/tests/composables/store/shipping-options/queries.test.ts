import { useCartShippingOptions } from '../../../../src/';
import { fixtures } from '../../../../mocks/data';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCartShippingOptions hook', () => {
  test('success', async () => {
    const cartShippingOptions = fixtures.list('shipping_option', 5);

    const { vm } = createWrapperComponent(() =>
      useCartShippingOptions('cart_test')
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.shipping_options).toEqual(cartShippingOptions);
  });
});
