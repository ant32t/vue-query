import { ToRefs } from "vue-demi";
import type { MutationFunction, MutationKey, MutationObserverOptions, MutateFunction, MutationObserverResult } from "@tanstack/query-core";
import { WithQueryClientKey } from "./types";
declare type MutationResult<TData, TError, TVariables, TContext> = Omit<MutationObserverResult<TData, TError, TVariables, TContext>, "mutate" | "reset">;
export declare type UseMutationOptions<TData, TError, TVariables, TContext> = WithQueryClientKey<MutationObserverOptions<TData, TError, TVariables, TContext>>;
declare type MutateSyncFunction<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = (...options: Parameters<MutateFunction<TData, TError, TVariables, TContext>>) => void;
export declare type UseMutationReturnType<TData, TError, TVariables, TContext, Result = MutationResult<TData, TError, TVariables, TContext>> = ToRefs<Readonly<Result>> & {
    mutate: MutateSyncFunction<TData, TError, TVariables, TContext>;
    mutateAsync: MutateFunction<TData, TError, TVariables, TContext>;
    reset: MutationObserverResult<TData, TError, TVariables, TContext>["reset"];
};
export declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(options: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationReturnType<TData, TError, TVariables, TContext>;
export declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">): UseMutationReturnType<TData, TError, TVariables, TContext>;
export declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationKey: MutationKey, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationKey">): UseMutationReturnType<TData, TError, TVariables, TContext>;
export declare function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationKey: MutationKey, mutationFn?: MutationFunction<TData, TVariables>, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationKey" | "mutationFn">): UseMutationReturnType<TData, TError, TVariables, TContext>;
export declare function parseMutationArgs<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(arg1: MutationKey | MutationFunction<TData, TVariables> | UseMutationOptions<TData, TError, TVariables, TContext>, arg2?: MutationFunction<TData, TVariables> | UseMutationOptions<TData, TError, TVariables, TContext>, arg3?: UseMutationOptions<TData, TError, TVariables, TContext>): UseMutationOptions<TData, TError, TVariables, TContext>;
export {};
