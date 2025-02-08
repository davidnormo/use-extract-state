import { useRef, useMemo, useState, useCallback } from 'react';

type AcceptedTypes = object | number | string | boolean | undefined | null;

type Setter<T> = (x: T | ((x:T) => T)) => void;

/**
 * Derive some state from a prop and allow local overrides.
 * Keeps the value in sync with the prop if it changes without an extra render.
 */
export function useExtractState<T extends AcceptedTypes>(prop: T, deps?: never): [T, Setter<T>];
export function useExtractState<T extends AcceptedTypes>(prop: () => T, deps: any[]): [T, Setter<T>];
export function useExtractState<T extends AcceptedTypes>(prop: T | (() => T), deps?: any[] | never): [T, Setter<T>] {
  let ds: [T] | any[];
  
  if (Array.isArray(deps)) {
    ds = deps;
  } else if (typeof prop !== 'function') {
    ds = [prop];
  } else {
    throw new Error('Either `prop` is a function with a `deps` array or `prop` is a value');
  }

  const ref = useRef(null) as React.RefObject<T>;
  useMemo(() => {
    ref.current = typeof prop === 'function' ? prop() : prop;
  }, ds);

  const [, setTemp] = useState(true);

  const setter: Setter<T> = useCallback((x) => {
    if (typeof x === 'function') {
      x = x(ref.current) as T;
    }
    if (x === ref.current) return;
    ref.current = x;
    setTemp(n => !n);
  }, []);

  return [ref.current, setter];
}