# use-extract-state

A React hook for overriding state within a component but keeping it in sync when the prop changes.

```tsx
const Counter = ({ count }: { count: number }) => {
  // Count can be modified locally but kept in sync if the prop changes
  const [localCount, setCount] = useExtractState(count);

  return <div onClick={() => setCount((n) => n + 1)}>Count: {localCount}</div>;
};
```

## Install

```
npm i use-extract-state
```
