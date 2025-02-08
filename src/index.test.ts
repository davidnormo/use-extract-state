import {act, renderHook} from '@testing-library/react';
import { useExtractState } from './index.js';

describe('useExtractState', () => {
  it('accepts some state and updates it', () => {
    const { result } = renderHook(({ x }: { x: number }) => {
      return useExtractState(x);
    }, { initialProps: { x: 0 } });

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1](1);
    })

    expect(result.current[0]).toBe(1);
  });

  it('can update with a function', () => {
    const { result } = renderHook(({ x }: { x: number }) => {
      return useExtractState(x);
    }, { initialProps: { x: 1 } });

    act(() => {
      result.current[1](n => n + 5);
    })

    expect(result.current[0]).toBe(6);
  });

  it('derives some state and updates', () => {
    const { result } = renderHook(({ x }: { x: number }) => {
      return useExtractState(() => 100, [x]);
    }, { initialProps: { x: 0 } });

    expect(result.current[0]).toBe(100);

    act(() => {
      result.current[1](200);
    })

    expect(result.current[0]).toBe(200);
  });

  it('throws is deps are not provided', () => {
    expect(() => useExtractState(() => 100)).toThrow();
  })
});