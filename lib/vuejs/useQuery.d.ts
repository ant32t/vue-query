import type { ToRefs } from "vue-demi";
import type { QueryFunction, QueryKey, QueryObserverResult, DefinedQueryObserverResult } from "@tanstack/query-core";
import { UseQueryReturnType as UQRT } from "./useBaseQuery";
import type { WithQueryClientKey, VueQueryObserverOptions } from "./types";
declare type UseQueryReturnType<TData, TError> = Omit<UQRT<TData, TError>, "refetch" | "remove"> & {
    refetch: QueryObserverResult<TData, TError>["refetch"];
    remove: QueryObserverResult<TData, TError>["remove"];
};
declare type UseQueryDefinedReturnType<TData, TError> = Omit<ToRefs<Readonly<DefinedQueryObserverResult<TData, TError>>>, "refetch" | "remove"> & {
    suspense: () => Promise<QueryObserverResult<TData, TError>>;
    refetch: QueryObserverResult<TData, TError>["refetch"];
    remove: QueryObserverResult<TData, TError>["remove"];
};
export declare type UseQueryOptions<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = WithQueryClientKey<VueQueryObserverOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "initialData"> & {
    initialData?: () => undefined;
}): UseQueryReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "initialData"> & {
    initialData: TQueryFnData | (() => TQueryFnData);
}): UseQueryDefinedReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "initialData"> & {
    initialData?: () => undefined;
}): UseQueryReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "initialData"> & {
    initialData: TQueryFnData | (() => TQueryFnData);
}): UseQueryDefinedReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey">): UseQueryReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn" | "initialData"> & {
    initialData?: () => undefined;
}): UseQueryReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn" | "initialData"> & {
    initialData: TQueryFnData | (() => TQueryFnData);
}): UseQueryDefinedReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn">): UseQueryReturnType<TData, TError>;
export {};
