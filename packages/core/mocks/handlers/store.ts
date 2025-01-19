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

  http.get('/store/products/:id', async(_ctx) => {
    return HttpResponse.json({
        product: fixtures.get('product'),
    }, { status: 200 });
  }),

  http.get('/store/collections', async(_ctx) => {
    return HttpResponse.json({
        collections: fixtures.list('product_collection'),
    }, { status: 200 });
  }),

  http.get('/store/collections/:id', async(_ctx) => {
    return HttpResponse.json({
        collection: fixtures.get('product_collection'),
    }, { status: 200 });
  }),

  http.get('/store/regions', async(_ctx) => {
    return HttpResponse.json({
        regions: fixtures.list('region'),
    }, { status: 200 });
  }),

  http.get('/store/regions/:id', async(_ctx) => {
    return HttpResponse.json({
        region: fixtures.get('region'),
    }, { status: 200 });
  }),

  http.get('/store/orders/:id', async(_ctx) => {
    return HttpResponse.json({
        order: fixtures.get('order'),
    }, { status: 200 });
  }),

  http.get('/store/orders', async(_ctx) => {
    return HttpResponse.json({
        orders: fixtures.list('order', 5),
        limit: 5,
        offset: 0,
    }, { status: 200 });
  }),

  http.get('/store/shipping-options', async(_ctx) => {
    return HttpResponse.json({
        shipping_options: fixtures.list('shipping_option', 5),
    }, { status: 200 });
  }),

  http.get('/store/customers/me', async(_ctx) => {
    return HttpResponse.json({
        customer: fixtures.get('customer'),
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

  http.get('/store/carts/:id', async (_ctx) => {

      return HttpResponse.json({
          cart: fixtures.get('cart'),
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

  http.post('/store/carts', async(_ctx) => {
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

  http.post('/store/carts/:id/shipping-methods', async(ctx) => {
    const { id } = ctx.params;

    return HttpResponse.json({
        cart: {
          ...fixtures.get('cart'),
          id,
        },
    }, { status: 200 });
  }),
];
