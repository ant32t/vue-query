import { Ref } from "vue-demi";
import type { MutationKey, MutationFilters as MF } from "@tanstack/query-core";
import type { MaybeRefDeep, WithQueryClientKey } from "./types";
export declare type MutationFilters = MaybeRefDeep<WithQueryClientKey<MF>>;
export declare function useIsMutating(filters?: MutationFilters): Ref<number>;
export declare function useIsMutating(mutationKey?: MutationKey, filters?: Omit<MutationFilters, "mutationKey">): Ref<number>;
export declare function parseMutationFilterArgs(arg1?: MutationKey | MutationFilters, arg2?: MutationFilters): WithQueryClientKey<MF>;
