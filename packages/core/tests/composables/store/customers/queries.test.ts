import { http, HttpResponse } from 'msw';
import { fixtures } from '../../../../mocks/data';
import { server } from '../../../../mocks/server';
import { useCustomerOrders, useMeCustomer } from '../../../../src';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useMeCustomer hook', () => {
  test('returns customer', async () => {
    const { vm } = createWrapperComponent(() => useMeCustomer());

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.customer).toEqual(fixtures.get('customer'));
  });
});

describe('useCustomerOrders hook', () => {
  test("returns customer's orders", async () => {
    const orders = fixtures.list('order', 5);

    const { vm } = createWrapperComponent(() => useCustomerOrders());

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.orders).toEqual(orders);
    expect(vm.data?.limit).toEqual(5);
    expect(vm.data?.offset).toEqual(0);
  });

  test("propagates query params and returns customer's orders", async () => {
    const orders = fixtures.list('order');

    server.use(
      http.get('/store/orders', async (ctx) => {
        const limit = (new URL(ctx.request.url)).searchParams.get('limit');
        const offset = (new URL(ctx.request.url)).searchParams.get('offset');
        const fields = (new URL(ctx.request.url)).searchParams.get('fields');
        expect({
          limit,
          offset,
          fields,
        }).toEqual({
          limit: '2',
          offset: '5',
          fields: 'field_1,field_2',
        });

        return HttpResponse.json({
          orders,
          limit: 2,
          offset: 5,
        }, { status: 200 });
      })
    );

    const { vm } = createWrapperComponent(() =>
      useCustomerOrders({
        limit: 2,
        offset: 5,
        fields: 'field_1,field_2',
      })
    );

    await waitFor(() => vm.isSuccess);

    expect(vm.status).toEqual('success');
    expect(vm.data?.orders).toEqual(orders);
    expect(vm.data?.limit).toEqual(2);
    expect(vm.data?.offset).toEqual(5);
  });
});
