import { QueryCache as QC } from "@tanstack/query-core";
import type { Query, QueryKey, QueryFilters } from "@tanstack/query-core";
import type { MaybeRefDeep } from "./types";
export declare class QueryCache extends QC {
    find<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(arg1: MaybeRefDeep<QueryKey>, arg2?: MaybeRefDeep<QueryFilters>): Query<TQueryFnData, TError, TData> | undefined;
    findAll(queryKey?: MaybeRefDeep<QueryKey>, filters?: MaybeRefDeep<QueryFilters>): Query[];
    findAll(filters?: MaybeRefDeep<QueryFilters>): Query[];
    findAll(arg1?: MaybeRefDeep<QueryKey | QueryFilters>, arg2?: MaybeRefDeep<QueryFilters>): Query[];
}
