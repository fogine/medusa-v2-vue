import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import Medusa from "@medusajs/js-sdk";
import { App } from "vue";

import { medusaKey } from "./injectionSymbols";

interface MedusaVueClientProps {
  baseUrl: string;
  /**
   * Authentication token
   */
  apiKey?: string;
  /**
   * PublishableApiKey identifier that defines the scope of resources
   * available within the request
   */
  publishableApiKey?: string;

  queryClientProviderProps?: VueQueryPluginOptions;
}

export const createMedusaVueClient = (options: MedusaVueClientProps) => {
  const medusaVueClient = {
    install: (app: App) => {
      const medusa = new Medusa({
        baseUrl: options.baseUrl,
        apiKey: options.apiKey,
        debug: false,
        publishableKey: options.publishableApiKey,
      });

      const defaultVueQueryPluginOptions: VueQueryPluginOptions = {
        queryClientConfig: {
          defaultOptions: {
            queries: {
              gcTime: 500,
              refetchOnWindowFocus: false,
              staleTime: 1000 * 60 * 60, //1h
              retry: 1,
            },
          },
        },
      };

      app.provide(medusaKey, { client: medusa });

      app.use(
        VueQueryPlugin,
        options.queryClientProviderProps || defaultVueQueryPluginOptions
      );
    },
  };

  return medusaVueClient;
};
