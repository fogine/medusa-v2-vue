import { http, HttpResponse } from 'msw';
import { fixtures } from "../data"

export const adminHandlers = [
  http.get("/admin/product-types", async(ctx) => {
    return HttpResponse.json({
        product_types: fixtures.list("product_type"),
    }, { status: 200 });
  }),
]
