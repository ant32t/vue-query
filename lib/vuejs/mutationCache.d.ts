import { MutationCache as MC } from "@tanstack/query-core";
import type { Mutation, MutationFilters } from "@tanstack/query-core";
import type { MaybeRefDeep } from "./types";
export declare class MutationCache extends MC {
    find<TData = unknown, TError = unknown, TVariables = any, TContext = unknown>(filters: MaybeRefDeep<MutationFilters>): Mutation<TData, TError, TVariables, TContext> | undefined;
    findAll(filters: MaybeRefDeep<MutationFilters>): Mutation[];
}
