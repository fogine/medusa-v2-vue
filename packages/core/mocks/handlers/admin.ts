import { http, HttpResponse } from 'msw';
import { fixtures } from "../data"

export const adminHandlers = [
  http.post("/admin/batch-jobs/", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>;

      return HttpResponse.json({
          batch_job: {
              ...fixtures.get("batch_job"),
              ...body,
          },
      }, { status: 200 });
  }),

  http.get("/admin/batch-jobs/", async(ctx) => {
    return HttpResponse.json({
        batch_jobs: fixtures.list("batch_job"),
    }, { status: 200 });
  }),

  http.get("/admin/batch-jobs/:id", async(ctx) => {
    return HttpResponse.json({
        batch_job: fixtures.get("batch_job"),
    }, { status: 200 });
  }),

  http.post("/admin/batch-jobs/:id/confirm", async(ctx) => {
    return HttpResponse.json({
        batch_job: fixtures.get("batch_job"),
    }, { status: 200 });
  }),

  http.post("/admin/batch-jobs/:id/cancel", async(ctx) => {
    return HttpResponse.json({
        batch_job: fixtures.get("batch_job"),
    }, { status: 200 });
  }),

  http.post("/admin/collections/", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>
        return HttpResponse.json({
            collection: {
              ...fixtures.get("product_collection"),
              ...body,
            },
        }, { status: 200 });
  }),

  http.get("/admin/collections/", async(ctx) => {
    return HttpResponse.json({
        collections: fixtures.list("product_collection"),
    }, { status: 200 });
  }),

  http.get("/admin/collections/:id", async(ctx) => {
    return HttpResponse.json({
        collection: fixtures.get("product_collection"),
    }, { status: 200 });
  }),

  http.post("/admin/collections/:id", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            collection: {
              ...fixtures.get("product_collection"),
              ...body,
              id: ctx.params.id,
            },
        }, { status: 200 });
  }),

  http.delete("/admin/collections/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "collection",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/collections/:id/products/batch", async(ctx) => {
    return HttpResponse.json({
        collection: {
          ...fixtures.get("product_collection"),
          products: [fixtures.get("product")],
        },
    }, { status: 200 });
  }),

  http.delete("/admin/collections/:id/products/batch", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "product-collection",
        removed_products: [fixtures.get("product").id],
    }, { status: 200 });
  }),

  http.post("/admin/gift-cards/", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>
        return HttpResponse.json({
            gift_card: {
              ...fixtures.get("gift_card"),
              ...body,
            },
        }, { status: 200 });
  }),

  http.get("/admin/gift-cards/", async(ctx) => {
    return HttpResponse.json({
        gift_cards: fixtures.list("gift_card"),
    }, { status: 200 });
  }),

  http.get("/admin/gift-cards/:id", async(ctx) => {
    return HttpResponse.json({
        gift_card: fixtures.get("gift_card"),
    }, { status: 200 });
  }),

  http.post("/admin/gift-cards/:id", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            gift_card: {
              ...fixtures.get("gift_card"),
              ...body,
              id: ctx.params.id,
            },
        }, { status: 200 });
  }),

  http.delete("/admin/gift-cards/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "gift_card",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/notes/", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            note: {
              ...fixtures.get("note"),
              ...body,
            },
        }, { status: 200 });
  }),

  http.get("/admin/notes/", async(ctx) => {
    return HttpResponse.json({
        notes: fixtures.list("note"),
    }, { status: 200 });
  }),

  http.get("/admin/notes/:id", async(ctx) => {
    return HttpResponse.json({
        note: fixtures.get("note"),
    }, { status: 200 });
  }),

  http.post("/admin/notes/:id", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            note: {
              ...fixtures.get("note"),
              ...body,
              id: ctx.params.id,
            },
        }, { status: 200 });
  }),

  http.delete("/admin/notes/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "note",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/price-lists/", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>
        return HttpResponse.json({
            price_list: {
              ...fixtures.get("price_list"),
              ...body,
            },
        }, { status: 200 });
  }),

  http.get("/admin/price-lists/", async(ctx) => {
    return HttpResponse.json({
        price_lists: fixtures.list("price_list"),
        count: 2,
        offset: 0,
        limit: 10,
    }, { status: 200 });
  }),

  http.get("/admin/price-lists/:id", async(ctx) => {
    return HttpResponse.json({
        price_list: fixtures.get("price_list"),
    }, { status: 200 });
  }),

  http.post("/admin/price-lists/:id", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            price_list: {
              ...fixtures.get("price_list"),
              ...body,
              id: ctx.params.id,
            },
        }, { status: 200 });
  }),

  http.delete("/admin/price-lists/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "price_list",
        deleted: true,
    }, { status: 200 });
  }),

  http.delete("/admin/price-lists/:id/prices/batch", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            ids: body.price_ids,
            object: "money-amount",
            deleted: true,
        }, { status: 200 });
  }),

  http.post("/admin/price-lists/:id/prices/batch", async(ctx) => {
    return HttpResponse.json({
        price_list: {
          ...fixtures.get("price_list"),
          id: ctx.params.id,
        },
    }, { status: 200 });
  }),

  http.delete(
    "/admin/price-lists/:id/products/:product_id/prices",
    async(ctx) => {
        return HttpResponse.json({
            ids: [],
            object: "money-amount",
            deleted: true,
        }, { status: 200 });
    }
  ),

  http.delete(
    "/admin/price-lists/:id/variants/:variant_id/prices",
    async(ctx) => {
        return HttpResponse.json({
            ids: [],
            object: "money-amount",
            deleted: true,
        }, { status: 200 });
    }
  ),

  http.post("/admin/return-reasons/", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            return_reason: {
              ...fixtures.get("return_reason"),
              ...body,
            },
        }, { status: 200 });
  }),

  http.get("/admin/return-reasons/", async(ctx) => {
    return HttpResponse.json({
        return_reasons: fixtures.list("return_reason"),
    }, { status: 200 });
  }),

  http.get("/admin/return-reasons/:id", async(ctx) => {
    return HttpResponse.json({
        return_reason: fixtures.get("return_reason"),
    }, { status: 200 });
  }),

  http.post("/admin/return-reasons/:id", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            return_reason: {
              ...fixtures.get("return_reason"),
              ...body,
              id: ctx.params.id,
            },
        }, { status: 200 });
  }),

  http.delete("/admin/return-reasons/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "return_reason",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/shipping-options/", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            shipping_option: {
              ...fixtures.get("shipping_option"),
              ...body,
            },
        }, { status: 200 });
  }),

  http.get("/admin/shipping-options/", async(ctx) => {
    return HttpResponse.json({
        shipping_options: fixtures.list("shipping_option"),
    }, { status: 200 });
  }),

  http.get("/admin/shipping-options/:id", async(ctx) => {
    return HttpResponse.json({
        shipping_option: fixtures.get("shipping_option"),
    }, { status: 200 });
  }),

  http.post("/admin/shipping-options/:id", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>
        return HttpResponse.json({
            shipping_option: {
              ...fixtures.get("shipping_option"),
              ...body,
              id: ctx.params.id,
            },
        }, { status: 200 });
  }),

  http.delete("/admin/shipping-options/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "shipping_option",
        deleted: true,
    }, { status: 200 });
  }),

  http.get("/admin/notifications/", async(ctx) => {
    return HttpResponse.json({
        notifications: fixtures.list("notification"),
    }, { status: 200 });
  }),

  http.post("/admin/notifications/:id/resend", async(ctx) => {
    return HttpResponse.json({
        notification: {
          ...fixtures.get("notification"),
          id: ctx.params.id,
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.get("/admin/invites", async(ctx) => {
    return HttpResponse.json({
        invites: fixtures.list("invite"),
    }, { status: 200 });
  }),

  http.post("/admin/invites/accept", async(ctx) => {
    return HttpResponse.json({
    }, { status: 200 });
  }),

  http.post("/admin/invites", async(ctx) => {
    return HttpResponse.json({
    }, { status: 200 });
  }),

  http.post("/admin/invites/:id", async(ctx) => {
    return HttpResponse.json({
    }, { status: 200 });
  }),

  http.delete("/admin/invites/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "invite",
        deleted: true,
    }, { status: 200 });
  }),

  http.get("/admin/returns", async(ctx) => {
    return HttpResponse.json({
        returns: fixtures.list("return"),
    }, { status: 200 });
  }),

  http.post("/admin/returns/:id/receive", async(ctx) => {
    return HttpResponse.json({
        return: fixtures.get("return"),
    }, { status: 200 });
  }),

  http.post("/admin/returns/:id/cancel", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/shipping-profiles/", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            shipping_profile: {
              ...fixtures.get("shipping_profile"),
              ...body,
            },
        }, { status: 200 });
  }),

  http.get("/admin/shipping-profiles/", async(ctx) => {
    return HttpResponse.json({
        shipping_profiles: fixtures.list("shipping_profile"),
    }, { status: 200 });
  }),

  http.get("/admin/shipping-profiles/:id", async(ctx) => {
    return HttpResponse.json({
        shipping_profile: fixtures.get("shipping_profile"),
    }, { status: 200 });
  }),

  http.post("/admin/shipping-profiles/:id", async(ctx) => {
    const body = (await ctx.request.json()) as Record<string, any>

        return HttpResponse.json({
            shipping_profile: {
              ...fixtures.get("shipping_profile"),
              ...body,
              id: ctx.params.id,
            },
        }, { status: 200 });
  }),

  http.delete("/admin/shipping-profiles/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "shipping_profile",
        deleted: true,
    }, { status: 200 });
  }),

  http.get("/admin/store/", async(ctx) => {
    return HttpResponse.json({
        store: fixtures.get("store"),
    }, { status: 200 });
  }),

  http.post("/admin/store/", async(ctx) => {
    return HttpResponse.json({
        store: {
          ...fixtures.get("store"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/store/:currency_code", async(ctx) => {
    return HttpResponse.json({
        store: fixtures.get("store"),
    }, { status: 200 });
  }),

  http.delete("/admin/store/currencies/:currency_code", async(ctx) => {
    return HttpResponse.json({
        store: fixtures.get("store"),
    }, { status: 200 });
  }),

  http.get("/admin/store/payment-providers", async(ctx) => {
    return HttpResponse.json({
        payment_providers: fixtures.get("store").payment_providers,
    }, { status: 200 });
  }),

  http.get("/admin/customers/", async(ctx) => {
    return HttpResponse.json({
        customers: fixtures.list("customer"),
    }, { status: 200 });
  }),

  http.get("/admin/customers/:id", async(ctx) => {
    return HttpResponse.json({
        customer: fixtures.get("customer"),
    }, { status: 200 });
  }),

  http.post("/admin/customers/", async(ctx) => {
    return HttpResponse.json({
        customer: {
          ...fixtures.get("customer"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/customers/:id", async(ctx) => {
    return HttpResponse.json({
        customer: {
          ...fixtures.get("customer"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.get("/admin/customer-groups/", async(ctx) => {
    return HttpResponse.json({
        customer_groups: fixtures.list("customer_group"),
    }, { status: 200 });
  }),

  http.get("/admin/customer-groups/:id", async(ctx) => {
    return HttpResponse.json({
        customer_group: fixtures.get("customer_group"),
    }, { status: 200 });
  }),

  http.post("/admin/customer-groups/", async(ctx) => {
    return HttpResponse.json({
        customer_group: {
          ...fixtures.get("customer_group"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/customer-groups/:id", async(ctx) => {
    return HttpResponse.json({
        customer_group: {
          ...fixtures.get("customer_group"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.get("/admin/customer-groups/:id/customers", async(ctx) => {
    return HttpResponse.json({
        customers: fixtures.list("customer"),
    }, { status: 200 });
  }),

  http.get("/admin/discounts/", async(ctx) => {
    return HttpResponse.json({
        discounts: fixtures.list("discount"),
    }, { status: 200 });
  }),

  http.get("/admin/discounts/:id", async(ctx) => {
    return HttpResponse.json({
        discount: fixtures.get("discount"),
    }, { status: 200 });
  }),

  http.get("/admin/discounts/code/:code", async(ctx) => {
    return HttpResponse.json({
        discount: fixtures.get("discount"),
    }, { status: 200 });
  }),

  http.post("/admin/discounts/:id/regions/:region_id", async(ctx) => {
    return HttpResponse.json({
        discount: fixtures.get("discount"),
    }, { status: 200 });
  }),

  http.post("/admin/discounts/:id/products/:product_id", async(ctx) => {
    return HttpResponse.json({
        discount: fixtures.get("discount"),
    }, { status: 200 });
  }),

  http.post("/admin/discounts/", async(ctx) => {
    return HttpResponse.json({
        discount: {
          ...fixtures.get("discount"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/discounts/:id", async(ctx) => {
    return HttpResponse.json({
        discount: {
          ...fixtures.get("discount"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/discounts/:id/dynamic-codes", async(ctx) => {
    return HttpResponse.json({
        discount: {
          ...fixtures.get("discount"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.delete("/admin/discounts/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "discount",
        deleted: true,
    }, { status: 200 });
  }),

  http.delete("/admin/discounts/:id/dynamic-codes/:code", async(ctx) => {
    return HttpResponse.json({
        discount: fixtures.get("discount"),
    }, { status: 200 });
  }),

  http.delete("/admin/discounts/:id/regions/:region_id", async(ctx) => {
    return HttpResponse.json({
        discount: fixtures.get("discount"),
    }, { status: 200 });
  }),

  http.delete("/admin/discounts/:id/products/:product_id", async(ctx) => {
    return HttpResponse.json({
        discount: fixtures.get("discount"),
    }, { status: 200 });
  }),

  http.post("/admin/discounts/:id/conditions", async(ctx) => {
    return HttpResponse.json({
        discount: {
          ...fixtures.get("discount"),
        },
    }, { status: 200 });
  }),

  http.post("/admin/discounts/:id/conditions/:conditionId", async(ctx) => {
    return HttpResponse.json({
        discount: {
          ...fixtures.get("discount"),
        },
    }, { status: 200 });
  }),

  http.get("/admin/discounts/:id/conditions/:conditionId", async(ctx) => {
    return HttpResponse.json({
        discount_condition: {
          ...fixtures
            .get("discount")
            .rule.conditions.find((c) => c.id === ctx.params.conditionId),
        },
    }, { status: 200 });
  }),

  http.delete(
    "/admin/discounts/:id/conditions/:conditionId",
    async(ctx) => {
        return HttpResponse.json({
            id: ctx.params.conditionId,
            object: "discount-condition",
            deleted: true,
            discount: fixtures.get("discount"),
        }, { status: 200 });
    }
  ),

  http.post(
    "/admin/discounts/:id/conditions/:conditionId/batch",
    async(ctx) => {
        return HttpResponse.json({
            discount: {
              ...fixtures.get("discount"),
              rule: {
                ...fixtures.get("discount").rule,
                conditions: [
                  {
                    ...fixtures.get("discount").rule.conditions[0],
                    products: [
                      ...(fixtures.get("discount").rule.conditions[0]?.products ??
                        []),
                      ...((await ctx.request.json()) as any).resources,
                    ],
                  },
                ],
              },
            },
        }, { status: 200 });
    }
  ),

  http.delete(
    "/admin/discounts/:id/conditions/:conditionId/batch",
    async(ctx) => {
        return HttpResponse.json({
            discount: {
              ...fixtures.get("discount"),
              rule: {
                ...fixtures.get("discount").rule,
                conditions: [
                  {
                    ...fixtures.get("discount").rule.conditions[0],
                    products: [],
                  },
                ],
              },
            },
        }, { status: 200 });
    }
  ),

  http.get("/admin/publishable-api-keys/", async(ctx) => {
    return HttpResponse.json({
        publishable_api_keys: fixtures.list("publishable_api_key"),
    }, { status: 200 });
  }),

  http.get("/admin/publishable-api-keys/:id", async(ctx) => {
    return HttpResponse.json({
        publishable_api_key: fixtures.get("publishable_api_key"),
    }, { status: 200 });
  }),

  http.post("/admin/publishable-api-keys/:id", async(ctx) => {
    return HttpResponse.json({
        publishable_api_key: {
          ...fixtures.get("publishable_api_key"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/publishable-api-keys/", async(ctx) => {
    return HttpResponse.json({
        publishable_api_key: {
          ...fixtures.get("publishable_api_key"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/publishable-api-keys/:id/revoke", async(ctx) => {
    return HttpResponse.json({
        publishable_api_key: {
          ...fixtures.get("publishable_api_key"),
          revoked_at: "2022-11-10 11:17:46.666Z",
          revoked_by: "admin_user",
        },
    }, { status: 200 });
  }),

  http.delete("/admin/publishable-api-keys/:id", async(ctx) => {
    return HttpResponse.json({
        id: fixtures.get("publishable_api_key").id,
        object: "publishable_api_key",
        deleted: true,
    }, { status: 200 });
  }),

  http.get("/admin/draft-orders/", async(ctx) => {
    return HttpResponse.json({
        draft_orders: fixtures.list("draft_order"),
    }, { status: 200 });
  }),

  http.get("/admin/draft-orders/:id", async(ctx) => {
    return HttpResponse.json({
        draft_order: fixtures.get("draft_order"),
    }, { status: 200 });
  }),

  http.post("/admin/draft-orders/", async(ctx) => {
    return HttpResponse.json({
        draft_order: {
          ...fixtures.get("draft_order"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/draft-orders/:id", async(ctx) => {
    return HttpResponse.json({
        draft_order: {
          ...fixtures.get("draft_order"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.delete("/admin/draft-orders/:id", async(ctx) => {
    return HttpResponse.json({
        id: fixtures.get("draft_order").id,
        object: "draft_order",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/draft-orders/:id/line-items", async(ctx) => {
    return HttpResponse.json({
        draft_order: fixtures.get("draft_order"),
    }, { status: 200 });
  }),

  http.post("/admin/draft-orders/:id/line-items/:item_id", async(ctx) => {
    return HttpResponse.json({
        draft_order: fixtures.get("draft_order"),
    }, { status: 200 });
  }),

  http.delete(
    "/admin/draft-orders/:id/line-items/:item_id",
    async(ctx) => {
        return HttpResponse.json({
            draft_order: fixtures.get("draft_order"),
        }, { status: 200 });
    }
  ),

  http.post("/admin/draft-orders/:id/pay", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.get("/admin/swaps/", async(ctx) => {
    return HttpResponse.json({
        swaps: fixtures.list("swap"),
    }, { status: 200 });
  }),

  http.get("/admin/swaps/:id", async(ctx) => {
    return HttpResponse.json({
        swap: fixtures.get("swap"),
    }, { status: 200 });
  }),

  http.get("/admin/variants/", async(ctx) => {
    return HttpResponse.json({
        variants: fixtures.list("product_variant"),
    }, { status: 200 });
  }),

  http.get("/admin/users/:id", async(ctx) => {
    return HttpResponse.json({
        user: fixtures.get("user"),
    }, { status: 200 });
  }),

  http.get("/admin/users/", async(ctx) => {
    return HttpResponse.json({
        users: fixtures.list("user"),
    }, { status: 200 });
  }),

  http.post("/admin/users/", async(ctx) => {
    return HttpResponse.json({
        user: {
          ...fixtures.get("user"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/users/password-token", async(ctx) => {
    return HttpResponse.json({
    }, { status: 200 });
  }),

  http.post("/admin/users/reset-password", async(ctx) => {
    return HttpResponse.json({
        user: fixtures.get("user"),
    }, { status: 200 });
  }),

  http.post("/admin/users/:id", async(ctx) => {
    return HttpResponse.json({
        user: {
          ...fixtures.get("user"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.delete("/admin/users/:id", async(ctx) => {
    return HttpResponse.json({
        id: fixtures.get("user").id,
        object: "user",
        deleted: true,
    }, { status: 200 });
  }),

  http.get("/admin/product-types", async(ctx) => {
    return HttpResponse.json({
        product_types: fixtures.list("product_type"),
    }, { status: 200 });
  }),

  http.get("/admin/products/tag-usage", async(ctx) => {
    return HttpResponse.json({
        tags: fixtures.list("product_tag"),
    }, { status: 200 });
  }),

  http.get("/admin/products/:id", async(ctx) => {
    return HttpResponse.json({
        product: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.get("/admin/products/", async(ctx) => {
    return HttpResponse.json({
        products: fixtures.list("product"),
    }, { status: 200 });
  }),

  http.post("/admin/products/:id", async(ctx) => {
    return HttpResponse.json({
        product: {
          ...fixtures.get("product"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/products/", async(ctx) => {
    return HttpResponse.json({
        product: {
          ...fixtures.get("product"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.delete("/admin/products/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "product",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/products/:id/metadata", async(ctx) => {
    return HttpResponse.json({
        product: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.post("/admin/products/:id/variants", async(ctx) => {
    return HttpResponse.json({
        product: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.post("/admin/products/:id/variants/:variant_id", async(ctx) => {
    return HttpResponse.json({
        product: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.delete("/admin/products/:id/variants/:variant_id", async(ctx) => {
    return HttpResponse.json({
        variant_id: ctx.params.variant_id,
        object: "product-variant",
        deleted: true,
        product: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.post("/admin/products/:id/options", async(ctx) => {
    return HttpResponse.json({
        product: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.post("/admin/products/:id/options/:option_id", async(ctx) => {
    return HttpResponse.json({
        product: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.delete("/admin/products/:id/options/:option_id", async(ctx) => {
    return HttpResponse.json({
        option_id: ctx.params.option_id,
        object: "option",
        deleted: true,
        product: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.get("/admin/regions/:id", async(ctx) => {
    return HttpResponse.json({
        region: fixtures.get("region"),
    }, { status: 200 });
  }),

  http.get("/admin/regions/:id/fulfillment-options", async(ctx) => {
    return HttpResponse.json({
        fulfillment_options: fixtures.get("fulfillment_option"),
    }, { status: 200 });
  }),

  http.get("/admin/regions/", async(ctx) => {
    return HttpResponse.json({
        regions: fixtures.list("region"),
    }, { status: 200 });
  }),

  http.post("/admin/regions/:id", async(ctx) => {
    return HttpResponse.json({
        region: {
          ...fixtures.get("region"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/regions/", async(ctx) => {
    return HttpResponse.json({
        region: {
          ...fixtures.get("region"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.delete("/admin/regions/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "region",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/regions/:id/metadata", async(ctx) => {
    return HttpResponse.json({
        region: fixtures.get("region"),
    }, { status: 200 });
  }),

  http.delete("/admin/regions/:id/metadata/:key", async(ctx) => {
    return HttpResponse.json({
        region: fixtures.get("region"),
    }, { status: 200 });
  }),

  http.post("/admin/regions/:id/countries", async(ctx) => {
    return HttpResponse.json({
        region: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.delete("/admin/regions/:id/countries/:code", async(ctx) => {
    return HttpResponse.json({
        region: fixtures.get("product"),
    }, { status: 200 });
  }),

  http.post("/admin/regions/:id/fulfillment-providers", async(ctx) => {
    return HttpResponse.json({
        region: fixtures.get("region"),
    }, { status: 200 });
  }),

  http.delete(
    "/admin/regions/:id/fulfillment-providers/:provider_id",
    async(ctx) => {
        return HttpResponse.json({
            region: fixtures.get("region"),
        }, { status: 200 });
    }
  ),

  http.delete(
    "/admin/regions/:id/payment-providers/:provider_id",
    async(ctx) => {
        return HttpResponse.json({
            region: fixtures.get("region"),
        }, { status: 200 });
    }
  ),

  http.post("/admin/regions/:id/payment-providers", async(ctx) => {
    return HttpResponse.json({
        region: fixtures.get("region"),
    }, { status: 200 });
  }),

  http.get("/admin/orders/:id", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.get("/admin/orders/", async(ctx) => {
    return HttpResponse.json({
        orders: fixtures.list("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id", async(ctx) => {
    return HttpResponse.json({
        order: {
          ...fixtures.get("order"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/orders/", async(ctx) => {
    return HttpResponse.json({
        order: {
          ...fixtures.get("order"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/complete", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/capture", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/refund", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/fulfillment", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post(
    "/admin/orders/:id/fulfillments/:fulfillment_id/cancel",
    async(ctx) => {
        return HttpResponse.json({
            order: fixtures.get("order"),
        }, { status: 200 });
    }
  ),

  http.post(
    "/admin/orders/:id/swaps/:swap_id/fulfillments/:fulfillment_id/cancel",
    async(ctx) => {
        return HttpResponse.json({
            order: fixtures.get("order"),
        }, { status: 200 });
    }
  ),

  http.post(
    "/admin/orders/:id/claims/:claim_id/fulfillments/:fulfillment_id/cancel",
    async(ctx) => {
        return HttpResponse.json({
            order: fixtures.get("order"),
        }, { status: 200 });
    }
  ),

  http.post("/admin/orders/:id/shipment", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/return", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/cancel", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/shipping-methods", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/archive", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/swaps", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/swaps/:swap_id/cancel", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/swaps/:swap_id/receive", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post(
    "/admin/orders/:id/swaps/:swap_id/fulfillments",
    async(ctx) => {
        return HttpResponse.json({
            order: fixtures.get("order"),
        }, { status: 200 });
    }
  ),

  http.post("/admin/orders/:id/swaps/:swap_id/shipments", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post(
    "/admin/orders/:id/swaps/:swap_id/process-payment",
    async(ctx) => {
        return HttpResponse.json({
            order: fixtures.get("order"),
        }, { status: 200 });
    }
  ),

  http.post("/admin/orders/:id/claims", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/claims/:claim_id/cancel", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post("/admin/orders/:id/claims/:claim_id/", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.post(
    "/admin/orders/:id/claims/:claim_id/fulfillments",
    async(ctx) => {
        return HttpResponse.json({
            order: fixtures.get("order"),
        }, { status: 200 });
    }
  ),

  http.post("/admin/orders/:id/claims/:claim_id/shipments", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.delete("/admin/orders/:id/metadata/:key", async(ctx) => {
    return HttpResponse.json({
        order: fixtures.get("order"),
    }, { status: 200 });
  }),

  http.get("/admin/order-edits/:id", async(ctx) => {
    const { id } = ctx.params
    return HttpResponse.json({
        order_edit: fixtures.get("order_edit"),
        id,
    }, { status: 200 });
  }),

  http.get("/admin/order-edits/", async(ctx) => {
    return HttpResponse.json({
        count: 1,
        limit: 20,
        offset: 0,
        order_edits: [fixtures.get("order_edit")],
    }, { status: 200 });
  }),

  http.post("/admin/order-edits/", async(ctx) => {
    return HttpResponse.json({
        order_edit: {
          ...fixtures.get("order_edit"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.get("/store/order-edits/:id", async(ctx) => {
    const { id } = ctx.params
    return HttpResponse.json({
        order_edit: fixtures.get("store_order_edit"),
        id,
    }, { status: 200 });
  }),

  http.post("/admin/order-edits/:id", async(ctx) => {
    return HttpResponse.json({
        order_edit: { ...fixtures.get("order_edit"), ...((await ctx.request.json()) as any) },
    }, { status: 200 });
  }),

  http.post("/admin/order-edits/:id/cancel", async(ctx) => {
    return HttpResponse.json({
        order_edit: {
          ...fixtures.get("order_edit"),
          canceled_at: new Date(),
          status: "canceled",
        },
    }, { status: 200 });
  }),

  http.post("/admin/order-edits/:id/confirm", async(ctx) => {
    return HttpResponse.json({
        order_edit: {
          ...fixtures.get("order_edit"),
          confirmed_at: new Date(),
          status: "confirmed",
        },
    }, { status: 200 });
  }),

  http.post("/admin/order-edits/:id/items", async(ctx) => {
    return HttpResponse.json({
        order_edit: { ...fixtures.get("order_edit"), ...((await ctx.request.json()) as any) },
    }, { status: 200 });
  }),

  http.post("/admin/order-edits/:id/request", async(ctx) => {
    return HttpResponse.json({
        order_edit: {
          ...fixtures.get("order_edit"),
          requested_at: new Date(),
          status: "requested",
        },
    }, { status: 200 });
  }),

  http.delete("/admin/order-edits/:id", async(ctx) => {
    const { id } = ctx.params
    return HttpResponse.json({
        id,
        object: "order_edit",
        deleted: true,
    }, { status: 200 });
  }),

  http.delete("/admin/order-edits/:id/changes/:change_id", async(ctx) => {
    const { change_id } = ctx.params
    return HttpResponse.json({
        id: change_id,
        object: "item_change",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/order-edits/:id/items/:item_id", async(ctx) => {
    return HttpResponse.json({
        order_edit: {
          ...fixtures.get("order_edit"),
          changes: [
            {
              quantity: ((await ctx.request.json()) as any).quantity,
            },
          ],
        },
    }, { status: 200 });
  }),

  http.delete("/admin/order-edits/:id/items/:item_id", async(ctx) => {
    return HttpResponse.json({
        order_edit: {
          ...fixtures.get("order_edit"),
          changes: [
            {
              type: "item_remove",
            },
          ],
        },
    }, { status: 200 });
  }),

  http.get("/admin/auth", async(ctx) => {
    return HttpResponse.json({
        user: fixtures.get("user"),
    }, { status: 200 });
  }),

  http.post("/admin/auth", async(ctx) => {
    return HttpResponse.json({
        user: fixtures.get("user"),
    }, { status: 200 });
  }),

  http.delete("/admin/auth", async(ctx) => {
    return HttpResponse.json({
    }, { status: 200 });
  }),

  http.delete("/admin/uploads", async(ctx) => {
    return HttpResponse.json({
        id: ((await ctx.request.json()) as any).file_key,
        object: "file",
        deleted: true,
    }, { status: 200 });
  }),

  http.post("/admin/uploads/download-url", async(ctx) => {
    return HttpResponse.json({
        download_url: fixtures.get("upload").url,
    }, { status: 200 });
  }),

  http.get("/admin/sales-channels/:id", async(ctx) => {
    return HttpResponse.json({
        sales_channel: fixtures.get("sales_channel"),
    }, { status: 200 });
  }),

  http.get("/admin/sales-channels", async(ctx) => {
    return HttpResponse.json({
        count: 1,
        limit: 20,
        offset: 20,
        sales_channels: fixtures.get("sales_channels"),
    }, { status: 200 });
  }),

  http.post("/admin/sales-channels/:id", async(ctx) => {
    return HttpResponse.json({
        sales_channel: {
          ...fixtures.get("sales_channel"),
          ...((await ctx.request.json()) as any),
        },
    }, { status: 200 });
  }),

  http.post("/admin/sales-channels", async(ctx) => {
    return HttpResponse.json({
        sales_channel: fixtures.get("sales_channel"),
        ...((await ctx.request.json()) as Record<string, unknown>),
    }, { status: 200 });
  }),

  http.delete("/admin/sales-channels/:id", async(ctx) => {
    return HttpResponse.json({
        id: ctx.params.id,
        object: "sales-channel",
        deleted: true,
    }, { status: 200 });
  }),

  http.delete("/admin/sales-channels/:id/products/batch", async(ctx) => {
    return HttpResponse.json({
        sales_channel: fixtures.get("sales_channel"),
    }, { status: 200 });
  }),

  http.post("/admin/sales-channels/:id/products/batch", async(ctx) => {
    return HttpResponse.json({
        sales_channel: fixtures.get("sales_channel"),
    }, { status: 200 });
  }),

  http.get("/admin/currencies", async(ctx) => {
    return HttpResponse.json({
        count: 1,
        limit: 20,
        offset: 20,
        currencies: fixtures.list("currency", 1),
    }, { status: 200 });
  }),

  http.post("/admin/currencies/:code", async(ctx) => {
    return HttpResponse.json({
        currency: { ...fixtures.get("currency"), ...((await ctx.request.json()) as any) },
    }, { status: 200 });
  }),
]
