import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import Medusa, {Config} from "@medusajs/js-sdk";
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
  auth?: Config['auth'];
  debug?: Config['debug'];
  logger?: Config['logger'];
  globalHeaders?: Config['globalHeaders'];
}

export const createMedusaVueClient = (options: MedusaVueClientProps) => {
  const medusaVueClient = {
    install: (app: App) => {
      const medusa = new Medusa({
        baseUrl: options.baseUrl,
        apiKey: options.apiKey,
        publishableKey: options.publishableApiKey,
        debug: options.debug ?? false,
        ...(options.auth && {auth: options.auth}),
        ...(options.logger && {logger: options.logger}),
        ...(options.globalHeaders && {globalHeaders: options.globalHeaders}),
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
