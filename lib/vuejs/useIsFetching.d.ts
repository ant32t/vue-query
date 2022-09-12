import { Ref } from "vue-demi";
import type { QueryKey, QueryFilters as QF } from "@tanstack/query-core";
import type { MaybeRefDeep, WithQueryClientKey } from "./types";
export declare type QueryFilters = MaybeRefDeep<WithQueryClientKey<QF>>;
export declare function useIsFetching(filters?: QueryFilters): Ref<number>;
export declare function useIsFetching(queryKey?: QueryKey, filters?: QueryFilters): Ref<number>;
export declare function parseFilterArgs(arg1?: QueryKey | QueryFilters, arg2?: QueryFilters): WithQueryClientKey<QF>;
