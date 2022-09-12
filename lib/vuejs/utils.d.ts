import type { QueryKey } from "@tanstack/query-core";
import { UnwrapRef } from "vue-demi";
export declare const VUE_QUERY_CLIENT = "VUE_QUERY_CLIENT";
export declare function getClientKey(key?: string): string;
export declare function isQueryKey(value: unknown): value is QueryKey;
export declare function updateState(state: Record<string, unknown>, update: Record<string, any>): void;
export declare function cloneDeep<T>(value: T, customizer?: (val: unknown) => unknown | void): T;
export declare function cloneDeepUnref<T>(obj: T): UnwrapRef<T>;
