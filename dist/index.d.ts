type AcceptedTypes = object | number | string | boolean | undefined | null;
type Setter<T> = (x: T | ((x: T) => T)) => void;
/**
 * Derive some state from a prop and allow local overrides.
 * Keeps the value in sync with the prop if it changes without an extra render.
 */
export declare function useExtractState<T extends AcceptedTypes>(prop: T, deps?: never): [T, Setter<T>];
export declare function useExtractState<T extends AcceptedTypes>(prop: () => T, deps: any[]): [T, Setter<T>];
export {};
