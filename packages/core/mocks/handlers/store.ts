import { fixtures } from '../data';
import { http, HttpResponse } from 'msw';

export const storeHandlers = [
  http.get('/store/products', async (ctx) => {
      ctx.request.url
    const limit = parseInt((new URL(ctx.request.url)).searchParams.get('limit') || '2');
    const offset = parseInt((new URL(ctx.request.url)).searchParams.get('offset') || '0');
    return HttpResponse.json({
        products: fixtures.list('product', limit),
        offset,
        limit,
    }, { status: 200 });
  }),

  http.get('/store/products/:id', async(ctx) => {
    return HttpResponse.json({
        product: fixtures.get('product'),
    }, { status: 200 });
  }),

  http.get('/store/product-types', async(ctx) => {
    const limit = parseInt((new URL(ctx.request.url)).searchParams.get('limit') || '2');
    const offset = parseInt((new URL(ctx.request.url)).searchParams.get('offset') || '0');
    return HttpResponse.json({
        product_types: fixtures.list('product_type'),
        offset,
        limit,
    }, { status: 200 });
  }),

  http.get('/store/collections', async(ctx) => {
    return HttpResponse.json({
        collections: fixtures.list('product_collection'),
    }, { status: 200 });
  }),

  http.get('/store/collections/:id', async(ctx) => {
    return HttpResponse.json({
        collection: fixtures.get('product_collection'),
    }, { status: 200 });
  }),

  http.get('/store/regions', async(ctx) => {
    return HttpResponse.json({
        regions: fixtures.list('region'),
    }, { status: 200 });
  }),

  http.get('/store/regions/:id', async(ctx) => {
    return HttpResponse.json({
        region: fixtures.get('region'),
    }, { status: 200 });
  }),

  http.get('/store/gift-cards/:id', async(ctx) => {
    return HttpResponse.json({
        gift_card: fixtures.get('gift_card'),
    }, { status: 200 });
  }),

  http.post('/store/order-edits/:id/decline', async(ctx) => {
    return HttpResponse.json({
        order_edit: {
          ...fixtures.get('store_order_edit'),
          declined_reason: (ctx.request.body as any).declined_reason,
          status: 'declined',
        },
    }, { status: 200 });
  }),

  http.post('/store/order-edits/:id/complete', async(ctx) => {
    return HttpResponse.json({
        order_edit: {
          ...fixtures.get('store_order_edit'),
          status: 'confirmed',
        },
    }, { status: 200 });
  }),

  http.get('/store/orders/:id', async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get('order'),
    }, { status: 200 });
  }),

  http.get('/store/orders/cart/:id', async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get('order'),
    }, { status: 200 });
  }),

  http.get('/store/orders', async(ctx) => {
    return HttpResponse.json({
        orders: fixtures.list('order', 5),
        limit: 5,
        offset: 0,
    }, { status: 200 });
  }),

  http.post('/store/orders/customer/confirm', async(ctx) => {
    return HttpResponse.json({
    }, { status: 200 });
  }),

  http.post('/store/orders/batch/customer/token', async(ctx) => {
    return HttpResponse.json({
    }, { status: 200 });
  }),

  http.get('/store/return-reasons', async(ctx) => {
    return HttpResponse.json({
        return_reasons: fixtures.list('return_reason'),
    }, { status: 200 });
  }),

  http.get('/store/return-reasons/:id', async(ctx) => {
    return HttpResponse.json({
        return_reason: fixtures.get('return_reason'),
    }, { status: 200 });
  }),

  http.get('/store/shipping-options/:cart_id', async(ctx) => {
    return HttpResponse.json({
        shipping_options: fixtures.list('shipping_option'),
    }, { status: 200 });
  }),

  http.get('/store/shipping-options', async(ctx) => {
    return HttpResponse.json({
        shipping_options: fixtures.list('shipping_option', 5),
    }, { status: 200 });
  }),

  http.get('/store/swaps/:cart_id', async(ctx) => {
    return HttpResponse.json({
        swap: fixtures.get('swap'),
    }, { status: 200 });
  }),

  http.get('/store/customers/me', async(ctx) => {
    return HttpResponse.json({
        customer: fixtures.get('customer'),
    }, { status: 200 });
  }),

  http.get('/store/customers/me/orders', async(ctx) => {
    return HttpResponse.json({
        orders: fixtures.list('order', 5),
        limit: 5,
        offset: 0,
    }, { status: 200 });
  }),

  http.post('/store/customers', async(ctx) => {
    const body = await ctx.request.json() as Record<string, string>;
    const dummyCustomer = fixtures.get('customer');
    const customer = {
      ...dummyCustomer,
      ...body,
    };

    return HttpResponse.json({
        customer
    }, { status: 200 });
  }),

  http.post('/store/customers/me', async(ctx) => {
    const body = await ctx.request.json() as Record<string, string>;
    const dummyCustomer = fixtures.get('customer');
    const customer = {
      ...dummyCustomer,
      ...body,
    };

    return HttpResponse.json({
        customer,
    }, { status: 200 });
  }),

  http.get('/store/carts/:id', async (ctx) => {

      return HttpResponse.json({
          cart: fixtures.get('cart'),
      }, { status: 200 });
  }),

  http.post('/store/returns', async(ctx) => {
    const {items, ...body} = await ctx.request.json() as Record<string, any>;
    const ret = fixtures.get('return');
    const item = ret.items[0];
    ret.items = items.map(i => ({ ...i, ...item }));

    return HttpResponse.json({
        return: {
          ...ret,
          ...body,
        },
    }, { status: 200 });
  }),

  http.post('/store/swaps', async(ctx) => {
    const { additional_items, return_items, ...body } = (await ctx.request.json()) as Record<
      string,
      any
    >;
    const swap = fixtures.get('swap');
    const additional_item = swap.additional_items[0];
    swap.additional_items = additional_items.map(i => ({
      ...i,
      ...additional_item,
    }));
    const return_item = swap.return_order.items[0];
    swap.return_order.items = return_items.map(i => ({
      ...i,
      ...return_item,
    }));

    return HttpResponse.json({
        swap: {
          ...swap,
          ...body,
        },
    }, { status: 200 });
  }),

  http.post('/store/carts/:id/line-items', async(ctx) => {
    const { id } = ctx.params;
    const { quantity, variant_id } = (await ctx.request.json()) as Record<string, any>;
    const item = fixtures.get('line_item');

    return HttpResponse.json({
        cart: {
          ...fixtures.get('cart'),
          id,
          items: [
            {
              ...item,
              quantity,
              variant_id,
            },
          ],
        },
    }, { status: 200 });
  }),

  http.post('/store/carts/:id/line-items/:line_id', async(ctx) => {
    const { id, line_id } = ctx.params;
    const { quantity } = (await ctx.request.json()) as Record<string, any>;
    const item = fixtures.get('line_item');

    return HttpResponse.json({
        cart: {
          ...fixtures.get('cart'),
          id,
          items: [
            {
              ...item,
              id: line_id,
              quantity,
            },
          ],
        },
    }, { status: 200 });
  }),

  http.delete('/store/carts/:id/line-items/:line_id', async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.line_id,
        object: 'line-item',
        deleted: true,
        parent: fixtures.get('cart'),
    }, { status: 200 });
  }),

  http.post('/store/carts', async(ctx) => {
    return HttpResponse.json({
        cart: fixtures.get('cart'),
    }, { status: 200 });
  }),

  http.post('/store/carts/:id', async(ctx) => {
    const { id } = ctx.params;
    const body = (await ctx.request.json()) as Record<string, any>;

    return HttpResponse.json({
        cart: {
          ...fixtures.get('cart'),
          id,
          ...body,
        },
    }, { status: 200 });
  }),

  http.post('/store/carts/:id/complete', async(ctx) => {
    const { id } = ctx.params;

    return HttpResponse.json({
        type: 'order',
        order: fixtures.get('order'),
    }, { status: 200 });
  }),

  http.post('/store/carts/:id/payment-sessions', async(ctx) => {
    const { id } = ctx.params;

    return HttpResponse.json({
        cart: {
          ...fixtures.get('cart'),
          id,
        },
    }, { status: 200 });
  }),

  http.post(
    '/store/carts/:id/payment-sessions/:provider_id',
    async(ctx) => {
      const { id } = ctx.params;

        return HttpResponse.json({
            cart: {
              ...fixtures.get('cart'),
              id,
            },
        }, { status: 200 });
    }
  ),

  http.post(
    '/store/carts/:id/payment-sessions/:provider_id/refresh',
    async(ctx) => {
      const { id } = ctx.params;

        return HttpResponse.json({
            cart: {
              ...fixtures.get('cart'),
              id,
            },
        }, { status: 200 });
    }
  ),

  http.post('/store/carts/:id/payment-session', async(ctx) => {
    const { id } = ctx.params;

    return HttpResponse.json({
        cart: {
          ...fixtures.get('cart'),
          id,
        },
    }, { status: 200 });
  }),

  http.delete(
    '/store/carts/:id/payment-sessions/:provider_id',
    async(ctx) => {
      const { id } = ctx.params;

        return HttpResponse.json({
            cart: {
              ...fixtures.get('cart'),
              id,
            },
        }, { status: 200 });
    }
  ),

  http.post('/store/carts/:id/shipping-methods', async(ctx) => {
    const { id } = ctx.params;

    return HttpResponse.json({
        cart: {
          ...fixtures.get('cart'),
          id,
        },
    }, { status: 200 });
  }),

  http.get('/store/payment-collections/:id', async(ctx) => {
    const { id } = ctx.params;

    return HttpResponse.json({
        payment_collection: {
          ...fixtures.get('payment_collection'),
          id,
        },
    }, { status: 200 });
  }),

  http.post(
    '/store/payment-collections/:id/sessions/batch',
    async(ctx) => {
      const { id } = ctx.params;

        return HttpResponse.json({
            payment_collection: {
              ...fixtures.get('payment_collection'),
              id,
            },
        }, { status: 200 });
    }
  ),

  http.post(
    '/store/payment-collections/:id/sessions/batch/authorize',
    async(ctx) => {
      const { id } = ctx.params;

        return HttpResponse.json({
            payment_collection: {
              ...fixtures.get('payment_collection'),
              id,
            },
        }, { status: 200 });
    }
  ),

  http.post('/store/payment-collections/:id/sessions', async(ctx) => {
    const { id } = ctx.params;

    return HttpResponse.json({
        payment_collection: {
          ...fixtures.get('payment_collection'),
          id,
        },
    }, { status: 200 });
  }),

  http.post(
    '/store/payment-collections/:id/sessions/:session_id',
    async(ctx) => {
      const { id, session_id } = ctx.params;
      const payCol: any = { ...fixtures.get('payment_collection') };

      payCol.payment_sessions[0].id = `new_${session_id}`;
      const session = {
        payment_session: payCol.payment_sessions[0],
      };

        return HttpResponse.json({
            ...session,
        }, { status: 200 });
    }
  ),

  http.post(
    '/store/payment-collections/:id/sessions/:session_id/authorize',
    async(ctx) => {
      const { session_id } = ctx.params;

      const session = fixtures.get('payment_collection').payment_sessions[0];

        return HttpResponse.json({
            payment_collection: {
              ...session,
              id: session_id,
            },
        }, { status: 200 });
    }
  ),
];
