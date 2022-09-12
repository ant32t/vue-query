import type { UnwrapRef } from "vue-demi";
import type { QueryFunction, QueryKey, InfiniteQueryObserverResult } from "@tanstack/query-core";
import { UseQueryReturnType } from "./useBaseQuery";
import type { WithQueryClientKey, VueInfiniteQueryObserverOptions } from "./types";
export declare type UseInfiniteQueryOptions<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = WithQueryClientKey<VueInfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>>;
declare type InfiniteQueryReturnType<TData, TError> = UseQueryReturnType<TData, TError, InfiniteQueryObserverResult<TData, TError>>;
declare type UseInfiniteQueryReturnType<TData, TError> = Omit<InfiniteQueryReturnType<TData, TError>, "fetchNextPage" | "fetchPreviousPage" | "refetch" | "remove"> & {
    fetchNextPage: InfiniteQueryObserverResult<TData, TError>["fetchNextPage"];
    fetchPreviousPage: InfiniteQueryObserverResult<TData, TError>["fetchPreviousPage"];
    refetch: InfiniteQueryObserverResult<TData, TError>["refetch"];
    remove: InfiniteQueryObserverResult<TData, TError>["remove"];
};
export declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseInfiniteQueryReturnType<TData, TError>;
export declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey">): UseInfiniteQueryReturnType<TData, TError>;
export declare function useInfiniteQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, UnwrapRef<TQueryKey>>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn">): UseInfiniteQueryReturnType<TData, TError>;
export {};
