import { InjectionKey } from "vue";
import Medusa from "@medusajs/js-sdk";

export const medusaKey = Symbol("medusa-client") as InjectionKey<{
  client: Medusa;
}>;
