import { fixtures } from '../../../../mocks/data';
import {
  useAddShippingMethodToCart,
  useCompleteCart,
  useCreateCart,
  useCreatePaymentSession,
  useUpdateCart,
} from '../../../../src';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useCreateCart hook', () => {
  test('creates a cart', async () => {
    const { vm } = createWrapperComponent(() => useCreateCart());

    vm.mutate({});

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.cart).toEqual(fixtures.get('cart'));
  });
});

describe('useUpdateCart hook', () => {
  test('updates a cart', async () => {
    const { vm } = createWrapperComponent(() => useUpdateCart('some-cart'));

    vm.mutate({
      email: 'new@email.com',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'some-cart',
      email: 'new@email.com',
    });
  });
});

describe('useCompleteCart hook', () => {
  test('completes a cart', async () => {
    const { vm } = createWrapperComponent(() => useCompleteCart('test-cart'));

    vm.mutate();

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.type).toEqual('order');
    if (vm.data?.type === 'order') {
      expect(vm.data?.order).toEqual(fixtures.get('order'));
    }
  });
});

// describe('useCreatePaymentSession hook', () => {
//   test('creates a payment session', async () => {

//     const cart = fixtures.get('cart');
//     const { vm } = createWrapperComponent(() =>
//       useCreatePaymentSession(cart, {})
//     );

//     vm.mutate();

//     await waitFor(() => vm.isSuccess);

//     expect(vm.status).toEqual('success');
//     expect(vm.data?.cart).toEqual({
//       ...fixtures.get('cart'),
//       id: 'test-cart',
//     });
//   });
// });

describe('useAddShippingMethodToCart hook', () => {
  test('adds a shipping method to a cart', async () => {
    const { vm } = createWrapperComponent(() =>
      useAddShippingMethodToCart('test-cart')
    );

    vm.mutate({
      option_id: 'test-option',
    });

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.cart).toEqual({
      ...fixtures.get('cart'),
      id: 'test-cart',
    });
  });
});
