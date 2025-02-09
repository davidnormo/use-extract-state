# `useExtractState`

![CI state](https://github.com/davidnormo/use-extract-state/actions/workflows/node.js.yml/badge.svg)

A React hook for deriving state but keeping it in sync when it's dependencies change.

```tsx
const Counter = ({ count }: { count: number }) => {
  // `count` can be modified locally but kept in sync if the prop changes
  const [localCount, setCount] = useExtractState(count);

  return <div onClick={() => setCount((n) => n + 1)}>Count: {localCount}</div>;
};
```

## Install

With npm:

```
npm i use-extract-state
```

With yarn:

```
yarn add use-extract-state
```

## API

There are 2 ways to call `useExtractState`.

### Single value

The first is with a value:

```ts
// Where the equality of `x` can be determined with `Object.is`
const [x2, setX] = useExtractState(x);
// The returned value is the same as `useState`,
// a tuple where the first element is the value and the second a setter function
```

### Derive with Function

The second way of calling the hook is with a function and dependency array. This method is helpful if you want to derive a single value from multiple.

```ts
const [z, setZ] = useExtractState(() => x + y, [x, y]);
```

In the above example, `z` can be overridden by calling `setZ`. If either `x` or `y` change, `z` will be reset to the new result of `x + y`;

### Setter function

With both the examples above, the returned value is a tuple. The first element is the derived/extracted value and the second is a setter function.

This function behaves in the same way as `useState`'s setter. It's a stable referenced function that accepts the new value or a function:

```ts
const [x2, setX] = useExtractState(x); // x is a number

// Set the new value
setX(3);

// Get a reference to the old value and return the new value
setX((oldX) => oldX + 1);
```
