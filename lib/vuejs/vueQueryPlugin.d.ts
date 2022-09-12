import type { QueryClientConfig } from "@tanstack/query-core";
import { QueryClient } from "./queryClient";
import { MaybeRefDeep } from "./types";
declare global {
    interface Window {
        __VUE_QUERY_CONTEXT__?: QueryClient;
    }
}
export interface AdditionalClient {
    queryClient: QueryClient;
    queryClientKey: string;
}
interface ConfigOptions {
    queryClientConfig?: MaybeRefDeep<QueryClientConfig>;
    queryClientKey?: string;
    contextSharing?: boolean;
}
interface ClientOptions {
    queryClient?: QueryClient;
    queryClientKey?: string;
    contextSharing?: boolean;
}
export declare type VueQueryPluginOptions = ConfigOptions | ClientOptions;
export declare const VueQueryPlugin: {
    install: (app: any, options?: VueQueryPluginOptions) => void;
};
export {};
