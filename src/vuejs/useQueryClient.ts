import { getCurrentInstance, getCurrentScope, inject } from "vue-demi";

import type { QueryClient } from "./queryClient";
import { getClient, getClientKey } from "./utils";

export function useQueryClient(id = ""): QueryClient {
  if (id.length && getCurrentScope()) {
    const queryClient = getClient(id);
    if (queryClient) return queryClient;
  }

  const vm = getCurrentInstance()?.proxy;

  if (!vm) {
    throw new Error(
      "vue-query hooks can only be used inside setup() function."
    );
  }

  const key = getClientKey(id);
  const queryClient = inject<QueryClient>(key);

  if (!queryClient) {
    throw new Error(
      "No 'queryClient' found in Vue context, use 'VueQueryPlugin' to properly initialize the library."
    );
  }

  return queryClient;
}
