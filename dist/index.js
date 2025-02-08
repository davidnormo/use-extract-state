import { useRef, useMemo, useState, useCallback } from 'react';
export function useExtractState(prop, deps) {
    let ds;
    if (Array.isArray(deps)) {
        ds = deps;
    }
    else if (typeof prop !== 'function') {
        ds = [prop];
    }
    else {
        throw new Error('Either `prop` is a function with a `deps` array or `prop` is a value');
    }
    const ref = useRef(null);
    useMemo(() => {
        ref.current = typeof prop === 'function' ? prop() : prop;
    }, ds);
    const [, setTemp] = useState(true);
    const setter = useCallback((x) => {
        if (typeof x === 'function') {
            x = x(ref.current);
        }
        if (x === ref.current)
            return;
        ref.current = x;
        setTemp(n => !n);
    }, []);
    return [ref.current, setter];
}
