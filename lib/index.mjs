import { isRef, unref, getCurrentInstance, inject, isVue2, reactive, watch, onScopeDispose, toRefs, readonly, ref } from 'vue-demi';
import { QueryCache as QueryCache$1, MutationCache as MutationCache$1, QueryClient as QueryClient$1, QueryObserver, QueriesObserver, InfiniteQueryObserver, MutationObserver } from '@tanstack/query-core';
export * from '@tanstack/query-core';
import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { matchSorter } from 'match-sorter';

const VUE_QUERY_CLIENT = "VUE_QUERY_CLIENT";
function getClientKey(key) {
    const suffix = key ? `:${key}` : "";
    return `${VUE_QUERY_CLIENT}${suffix}`;
}
function isQueryKey(value) {
    return Array.isArray(value);
}
function updateState(state, update) {
    Object.keys(state).forEach((key) => {
        state[key] = update[key];
    });
}
function cloneDeep(value, customizer) {
    if (customizer) {
        const result = customizer(value);
        if (result !== undefined || isRef(value)) {
            return result;
        }
    }
    if (Array.isArray(value)) {
        return value.map((val) => cloneDeep(val, customizer));
    }
    if (typeof value === "object" && isPlainObject(value)) {
        const entries = Object.entries(value).map(([key, val]) => [
            key,
            cloneDeep(val, customizer),
        ]);
        return Object.fromEntries(entries);
    }
    return value;
}
function cloneDeepUnref(obj) {
    return cloneDeep(obj, (val) => {
        if (isRef(val)) {
            return cloneDeepUnref(unref(val));
        }
    });
}
function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}

function useQueryClient(id = "") {
    var _a;
    const vm = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
    if (!vm) {
        throw new Error("vue-query hooks can only be used inside setup() function.");
    }
    const key = getClientKey(id);
    const queryClient = inject(key);
    if (!queryClient) {
        throw new Error("No 'queryClient' found in Vue context, use 'VueQueryPlugin' to properly initialize the library.");
    }
    return queryClient;
}

class QueryCache extends QueryCache$1 {
    find(arg1, arg2) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        return super.find(arg1Unreffed, arg2Unreffed);
    }
    findAll(arg1, arg2) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return super.findAll(arg1Unreffed, arg2Unreffed);
        }
        return super.findAll(arg1Unreffed);
    }
}

class MutationCache extends MutationCache$1 {
    find(filters) {
        return super.find(cloneDeepUnref(filters));
    }
    findAll(filters) {
        return super.findAll(cloneDeepUnref(filters));
    }
}

class QueryClient extends QueryClient$1 {
    constructor(config = {}) {
        const unreffedConfig = cloneDeepUnref(config);
        const vueQueryConfig = {
            logger: cloneDeepUnref(unreffedConfig.logger),
            defaultOptions: cloneDeepUnref(unreffedConfig.defaultOptions),
            queryCache: unreffedConfig.queryCache || new QueryCache(),
            mutationCache: unreffedConfig.mutationCache || new MutationCache(),
        };
        super(vueQueryConfig);
    }
    isFetching(arg1, arg2) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return super.isFetching(arg1Unreffed, arg2Unreffed);
        }
        return super.isFetching(arg1Unreffed);
    }
    isMutating(filters) {
        return super.isMutating(cloneDeepUnref(filters));
    }
    getQueryData(queryKey, filters) {
        return super.getQueryData(cloneDeepUnref(queryKey), cloneDeepUnref(filters));
    }
    getQueriesData(queryKeyOrFilters) {
        const unreffed = cloneDeepUnref(queryKeyOrFilters);
        if (isQueryKey(unreffed)) {
            return super.getQueriesData(unreffed);
        }
        return super.getQueriesData(unreffed);
    }
    setQueryData(queryKey, updater, options) {
        return super.setQueryData(cloneDeepUnref(queryKey), updater, cloneDeepUnref(options));
    }
    setQueriesData(queryKeyOrFilters, updater, options) {
        const arg1Unreffed = cloneDeepUnref(queryKeyOrFilters);
        const arg3Unreffed = cloneDeepUnref(options);
        if (isQueryKey(arg1Unreffed)) {
            return super.setQueriesData(arg1Unreffed, updater, arg3Unreffed);
        }
        return super.setQueriesData(arg1Unreffed, updater, arg3Unreffed);
    }
    getQueryState(queryKey, filters) {
        return super.getQueryState(cloneDeepUnref(queryKey), cloneDeepUnref(filters));
    }
    removeQueries(arg1, arg2) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        if (isQueryKey(arg1Unreffed)) {
            return super.removeQueries(arg1Unreffed, cloneDeepUnref(arg2));
        }
        return super.removeQueries(arg1Unreffed);
    }
    resetQueries(arg1, arg2, arg3) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return super.resetQueries(arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return super.resetQueries(arg1Unreffed, arg2Unreffed);
    }
    cancelQueries(arg1, arg2, arg3) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return super.cancelQueries(arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return super.cancelQueries(arg1Unreffed, arg2Unreffed);
    }
    invalidateQueries(arg1, arg2, arg3) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return super.invalidateQueries(arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return super.invalidateQueries(arg1Unreffed, arg2Unreffed);
    }
    refetchQueries(arg1, arg2, arg3) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return super.refetchQueries(arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return super.refetchQueries(arg1Unreffed, arg2Unreffed);
    }
    fetchQuery(arg1, arg2, arg3) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return super.fetchQuery(arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return super.fetchQuery(arg1Unreffed);
    }
    prefetchQuery(arg1, arg2, arg3) {
        return super.prefetchQuery(cloneDeepUnref(arg1), cloneDeepUnref(arg2), cloneDeepUnref(arg3));
    }
    fetchInfiniteQuery(arg1, arg2, arg3) {
        const arg1Unreffed = cloneDeepUnref(arg1);
        const arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return super.fetchInfiniteQuery(arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return super.fetchInfiniteQuery(arg1Unreffed);
    }
    prefetchInfiniteQuery(arg1, arg2, arg3) {
        return super.prefetchInfiniteQuery(cloneDeepUnref(arg1), cloneDeepUnref(arg2), cloneDeepUnref(arg3));
    }
    setDefaultOptions(options) {
        super.setDefaultOptions(cloneDeepUnref(options));
    }
    setQueryDefaults(queryKey, options) {
        super.setQueryDefaults(cloneDeepUnref(queryKey), cloneDeepUnref(options));
    }
    getQueryDefaults(queryKey) {
        return super.getQueryDefaults(cloneDeepUnref(queryKey));
    }
    setMutationDefaults(mutationKey, options) {
        super.setMutationDefaults(cloneDeepUnref(mutationKey), cloneDeepUnref(options));
    }
    getMutationDefaults(mutationKey) {
        return super.getMutationDefaults(cloneDeepUnref(mutationKey));
    }
}

var QueryState;
(function (QueryState) {
    QueryState[QueryState["Fetching"] = 0] = "Fetching";
    QueryState[QueryState["Fresh"] = 1] = "Fresh";
    QueryState[QueryState["Stale"] = 2] = "Stale";
    QueryState[QueryState["Inactive"] = 3] = "Inactive";
    QueryState[QueryState["Paused"] = 4] = "Paused";
})(QueryState || (QueryState = {}));
function getQueryState(query) {
    if (query.state.fetchStatus === "fetching") {
        return QueryState.Fetching;
    }
    if (query.state.fetchStatus === "paused") {
        return QueryState.Paused;
    }
    if (!query.getObserversCount()) {
        return QueryState.Inactive;
    }
    if (query.isStale()) {
        return QueryState.Stale;
    }
    return QueryState.Fresh;
}
function getQueryStateLabel(query) {
    const queryState = getQueryState(query);
    if (queryState === QueryState.Fetching) {
        return "fetching";
    }
    if (queryState === QueryState.Paused) {
        return "paused";
    }
    if (queryState === QueryState.Stale) {
        return "stale";
    }
    if (queryState === QueryState.Inactive) {
        return "inactive";
    }
    return "fresh";
}
function getQueryStatusFg(query) {
    const queryState = getQueryState(query);
    if (queryState === QueryState.Stale) {
        return 0x000000;
    }
    return 0xffffff;
}
function getQueryStatusBg(query) {
    const queryState = getQueryState(query);
    if (queryState === QueryState.Fetching) {
        return 0x006bff;
    }
    if (queryState === QueryState.Paused) {
        return 0x8c49eb;
    }
    if (queryState === QueryState.Stale) {
        return 0xffb200;
    }
    if (queryState === QueryState.Inactive) {
        return 0x3f4e60;
    }
    return 0x008327;
}
const queryHashSort = (a, b) => String(a.queryHash).localeCompare(b.queryHash);
const dateSort = (a, b) => a.state.dataUpdatedAt < b.state.dataUpdatedAt ? 1 : -1;
const statusAndDateSort = (a, b) => {
    if (getQueryState(a) === getQueryState(b)) {
        return dateSort(a, b);
    }
    return getQueryState(a) > getQueryState(b) ? 1 : -1;
};
const sortFns = {
    "Status > Last Updated": statusAndDateSort,
    "Query Hash": queryHashSort,
    "Last Updated": dateSort,
};

const pluginId = "vue-query";
const pluginName = "Vue Query";
function setupDevtools(app, queryClient) {
    setupDevtoolsPlugin({
        id: pluginId,
        label: pluginName,
        packageName: "vue-query",
        homepage: "https://github.com/DamianOsipiuk/vue-query",
        logo: "https://vue-query.vercel.app/vue-query.svg",
        app,
        settings: {
            baseSort: {
                type: "choice",
                component: "button-group",
                label: "Sort Cache Entries",
                options: [
                    {
                        label: "ASC",
                        value: 1,
                    },
                    {
                        label: "DESC",
                        value: -1,
                    },
                ],
                defaultValue: 1,
            },
            sortFn: {
                type: "choice",
                label: "Sort Function",
                options: Object.keys(sortFns).map((key) => ({
                    label: key,
                    value: key,
                })),
                defaultValue: Object.keys(sortFns)[0],
            },
        },
    }, (api) => {
        const queryCache = queryClient.getQueryCache();
        api.addInspector({
            id: pluginId,
            label: pluginName,
            icon: "api",
            nodeActions: [
                {
                    icon: "cloud_download",
                    tooltip: "Refetch",
                    action: (queryHash) => {
                        var _a;
                        (_a = queryCache.get(queryHash)) === null || _a === void 0 ? void 0 : _a.fetch();
                    },
                },
                {
                    icon: "alarm",
                    tooltip: "Invalidate",
                    action: (queryHash) => {
                        const query = queryCache.get(queryHash);
                        queryClient.invalidateQueries(query.queryKey);
                    },
                },
                {
                    icon: "settings_backup_restore",
                    tooltip: "Reset",
                    action: (queryHash) => {
                        var _a;
                        (_a = queryCache.get(queryHash)) === null || _a === void 0 ? void 0 : _a.reset();
                    },
                },
                {
                    icon: "delete",
                    tooltip: "Remove",
                    action: (queryHash) => {
                        const query = queryCache.get(queryHash);
                        queryCache.remove(query);
                    },
                },
            ],
        });
        api.addTimelineLayer({
            id: pluginId,
            label: pluginName,
            color: 0xffd94c,
        });
        queryCache.subscribe((event) => {
            api.sendInspectorTree(pluginId);
            api.sendInspectorState(pluginId);
            if (event &&
                ["queryAdded", "queryRemoved", "queryUpdated"].includes(event.type)) {
                api.addTimelineEvent({
                    layerId: pluginId,
                    event: {
                        title: event.type,
                        subtitle: event.query.queryHash,
                        time: api.now(),
                        data: Object.assign({ queryHash: event.query.queryHash }, event),
                    },
                });
            }
        });
        api.on.getInspectorTree((payload) => {
            if (payload.inspectorId === pluginId) {
                const queries = queryCache.getAll();
                const settings = api.getSettings();
                const filtered = matchSorter(queries, payload.filter, {
                    keys: ["queryHash"],
                    baseSort: (a, b) => sortFns[settings.sortFn](a.item, b.item) * settings.baseSort,
                });
                const nodes = filtered.map((query) => {
                    const stateLabel = getQueryStateLabel(query);
                    return {
                        id: query.queryHash,
                        label: query.queryHash,
                        tags: [
                            {
                                label: `${stateLabel} [${query.getObserversCount()}]`,
                                textColor: getQueryStatusFg(query),
                                backgroundColor: getQueryStatusBg(query),
                            },
                        ],
                    };
                });
                payload.rootNodes = nodes;
            }
        });
        api.on.getInspectorState((payload) => {
            if (payload.inspectorId === pluginId) {
                const query = queryCache.get(payload.nodeId);
                if (!query) {
                    return;
                }
                payload.state = {
                    " Query Details": [
                        {
                            key: "Query key",
                            value: query.queryHash,
                        },
                        {
                            key: "Query status",
                            value: getQueryStateLabel(query),
                        },
                        {
                            key: "Observers",
                            value: query.getObserversCount(),
                        },
                        {
                            key: "Last Updated",
                            value: new Date(query.state.dataUpdatedAt).toLocaleTimeString(),
                        },
                    ],
                    "Data Explorer": [
                        {
                            key: "Data",
                            value: query.state.data,
                        },
                    ],
                    "Query Explorer": [
                        {
                            key: "Query",
                            value: query,
                        },
                    ],
                };
            }
        });
    });
}

const VueQueryPlugin = {
    install: (app, options = {}) => {
        const clientKey = getClientKey(options.queryClientKey);
        let client;
        if ("queryClient" in options && options.queryClient) {
            client = options.queryClient;
        }
        else {
            if (options.contextSharing && typeof window !== "undefined") {
                if (!window.__VUE_QUERY_CONTEXT__) {
                    const clientConfig = "queryClientConfig" in options
                        ? options.queryClientConfig
                        : undefined;
                    client = new QueryClient(clientConfig);
                    window.__VUE_QUERY_CONTEXT__ = client;
                }
                else {
                    client = window.__VUE_QUERY_CONTEXT__;
                }
            }
            else {
                const clientConfig = "queryClientConfig" in options
                    ? options.queryClientConfig
                    : undefined;
                client = new QueryClient(clientConfig);
            }
        }
        client.mount();
        const cleanup = () => {
            client.unmount();
        };
        if (app.onUnmount) {
            app.onUnmount(cleanup);
        }
        else {
            const originalUnmount = app.unmount;
            app.unmount = function vueQueryUnmount() {
                cleanup();
                originalUnmount();
            };
        }
        /* istanbul ignore next */
        if (isVue2) {
            app.mixin({
                beforeCreate() {
                    // HACK: taken from provide(): https://github.com/vuejs/composition-api/blob/master/src/apis/inject.ts#L30
                    if (!this._provided) {
                        const provideCache = {};
                        Object.defineProperty(this, "_provided", {
                            get: () => provideCache,
                            set: (v) => Object.assign(provideCache, v),
                        });
                    }
                    this._provided[clientKey] = client;
                    if (process.env.NODE_ENV === "development") {
                        if (this === this.$root) {
                            setupDevtools(this, client);
                        }
                    }
                },
            });
        }
        else {
            app.provide(clientKey, client);
            if (process.env.NODE_ENV === "development") {
                setupDevtools(app, client);
            }
        }
    },
};

function useBaseQuery(Observer, arg1, arg2 = {}, arg3 = {}) {
    var _a;
    const options = getQueryUnreffedOptions();
    const queryClient = (_a = options.queryClient) !== null && _a !== void 0 ? _a : useQueryClient(options.queryClientKey);
    const defaultedOptions = queryClient.defaultQueryOptions(options);
    const observer = new Observer(queryClient, defaultedOptions);
    const state = reactive(observer.getCurrentResult());
    const unsubscribe = observer.subscribe((result) => {
        updateState(state, result);
    });
    watch([() => arg1, () => arg2, () => arg3], () => {
        observer.setOptions(queryClient.defaultQueryOptions(getQueryUnreffedOptions()));
    }, { deep: true });
    onScopeDispose(() => {
        unsubscribe();
    });
    const suspense = () => {
        return new Promise((resolve) => {
            const run = () => {
                const newOptions = queryClient.defaultQueryOptions(getQueryUnreffedOptions());
                if (newOptions.enabled !== false) {
                    const optimisticResult = observer.getOptimisticResult(newOptions);
                    if (optimisticResult.isStale) {
                        resolve(observer.fetchOptimistic(defaultedOptions));
                    }
                    else {
                        resolve(optimisticResult);
                    }
                }
            };
            run();
            watch([() => arg1, () => arg2, () => arg3], run, { deep: true });
        });
    };
    return Object.assign(Object.assign({}, toRefs(readonly(state))), { suspense });
    /**
     * Get Query Options object
     * All inner refs unwrapped. No Reactivity
     */
    function getQueryUnreffedOptions() {
        let options;
        if (!isQueryKey(arg1)) {
            // `useQuery(optionsObj)`
            options = arg1;
        }
        else if (typeof arg2 === "function") {
            // `useQuery(queryKey, queryFn, optionsObj?)`
            options = Object.assign(Object.assign({}, arg3), { queryKey: arg1, queryFn: arg2 });
        }
        else {
            // `useQuery(queryKey, optionsObj?)`
            options = Object.assign(Object.assign({}, arg2), { queryKey: arg1 });
        }
        return cloneDeepUnref(options);
    }
}

function useQuery(arg1, arg2, arg3) {
    const result = useBaseQuery(QueryObserver, arg1, arg2, arg3);
    return Object.assign(Object.assign({}, result), { refetch: result.refetch.value, remove: result.remove.value });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function useQueries({ queries, }) {
    const unreffedQueries = cloneDeepUnref(queries);
    const queryClientKey = unreffedQueries[0].queryClientKey;
    const optionsQueryClient = unreffedQueries[0].queryClient;
    const queryClient = optionsQueryClient !== null && optionsQueryClient !== void 0 ? optionsQueryClient : useQueryClient(queryClientKey);
    const defaultedQueries = unreffedQueries.map((options) => {
        return queryClient.defaultQueryOptions(options);
    });
    const observer = new QueriesObserver(queryClient, defaultedQueries);
    const state = reactive(observer.getCurrentResult());
    const unsubscribe = observer.subscribe((result) => {
        state.splice(0, state.length, ...result);
    });
    watch(() => queries, () => {
        const defaulted = cloneDeepUnref(queries).map((options) => {
            return queryClient.defaultQueryOptions(options);
        });
        observer.setQueries(defaulted);
    }, { deep: true });
    onScopeDispose(() => {
        unsubscribe();
    });
    return readonly(state);
}

function useInfiniteQuery(arg1, arg2, arg3) {
    const result = useBaseQuery(InfiniteQueryObserver, arg1, arg2, arg3);
    return Object.assign(Object.assign({}, result), { fetchNextPage: result.fetchNextPage.value, fetchPreviousPage: result.fetchPreviousPage.value, refetch: result.refetch.value, remove: result.remove.value });
}

function useMutation(arg1, arg2, arg3) {
    var _a;
    const options = parseMutationArgs(arg1, arg2, arg3);
    const queryClient = (_a = options.queryClient) !== null && _a !== void 0 ? _a : useQueryClient(options.queryClientKey);
    const defaultedOptions = queryClient.defaultMutationOptions(options);
    const observer = new MutationObserver(queryClient, defaultedOptions);
    const state = reactive(observer.getCurrentResult());
    const unsubscribe = observer.subscribe((result) => {
        updateState(state, result);
    });
    const mutate = (variables, mutateOptions) => {
        observer.mutate(variables, mutateOptions).catch(() => {
            // This is intentional
        });
    };
    watch([() => arg1, () => arg2, () => arg3], () => {
        observer.setOptions(queryClient.defaultMutationOptions(parseMutationArgs(arg1, arg2, arg3)));
    }, { deep: true });
    onScopeDispose(() => {
        unsubscribe();
    });
    const resultRefs = toRefs(readonly(state));
    return Object.assign(Object.assign({}, resultRefs), { mutate, mutateAsync: state.mutate, reset: state.reset });
}
function parseMutationArgs(arg1, arg2, arg3) {
    let options = arg1;
    if (isQueryKey(arg1)) {
        if (typeof arg2 === "function") {
            options = Object.assign(Object.assign({}, arg3), { mutationKey: arg1, mutationFn: arg2 });
        }
        else {
            options = Object.assign(Object.assign({}, arg2), { mutationKey: arg1 });
        }
    }
    if (typeof arg1 === "function") {
        options = Object.assign(Object.assign({}, arg2), { mutationFn: arg1 });
    }
    return cloneDeepUnref(options);
}

function useIsFetching(arg1, arg2) {
    var _a;
    const filters = ref(parseFilterArgs(arg1, arg2));
    const queryClient = (_a = filters.value.queryClient) !== null && _a !== void 0 ? _a : useQueryClient(filters.value.queryClientKey);
    const isFetching = ref(queryClient.isFetching(filters));
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
        isFetching.value = queryClient.isFetching(filters);
    });
    watch([() => arg1, () => arg2], () => {
        filters.value = parseFilterArgs(arg1, arg2);
        isFetching.value = queryClient.isFetching(filters);
    }, { deep: true });
    onScopeDispose(() => {
        unsubscribe();
    });
    return isFetching;
}
function parseFilterArgs(arg1, arg2 = {}) {
    let options;
    if (isQueryKey(arg1)) {
        options = Object.assign(Object.assign({}, arg2), { queryKey: arg1 });
    }
    else {
        options = arg1 || {};
    }
    return cloneDeepUnref(options);
}

function useIsMutating(arg1, arg2) {
    var _a;
    const filters = ref(parseMutationFilterArgs(arg1, arg2));
    const queryClient = (_a = filters.value.queryClient) !== null && _a !== void 0 ? _a : useQueryClient(filters.value.queryClientKey);
    const isMutating = ref(queryClient.isMutating(filters));
    const unsubscribe = queryClient.getMutationCache().subscribe(() => {
        isMutating.value = queryClient.isMutating(filters);
    });
    watch([() => arg1, () => arg2], () => {
        filters.value = parseMutationFilterArgs(arg1, arg2);
        isMutating.value = queryClient.isMutating(filters);
    }, { deep: true });
    onScopeDispose(() => {
        unsubscribe();
    });
    return isMutating;
}
function parseMutationFilterArgs(arg1, arg2 = {}) {
    let options;
    if (isQueryKey(arg1)) {
        options = Object.assign(Object.assign({}, arg2), { mutationKey: arg1 });
    }
    else {
        options = arg1 || {};
    }
    return cloneDeepUnref(options);
}

export { MutationCache, QueryCache, QueryClient, VUE_QUERY_CLIENT, VueQueryPlugin, useInfiniteQuery, useIsFetching, useIsMutating, useMutation, useQueries, useQuery, useQueryClient };
//# sourceMappingURL=index.mjs.map
