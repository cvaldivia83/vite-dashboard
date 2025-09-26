import { renderHook, act } from '@testing-library/react';
import useForm from '../../hooks/useForm';
import { describe, expect, it } from 'vitest';
import "@testing-library/jest-dom";


describe('useForm Hook', () => {
  it('should start with empty value and null error', () => {
    const { result } = renderHook(() => useForm('email'));

    expect(result.current.value).toBe('');
    expect(result.current.error).toBe(null);
  })

  it('should update value on change', () => {
    const { result } = renderHook(() => useForm('nome'))

    act(() => {
      result.current.onChange({ target: { value: 'Carla' } } as any)
    })

    expect(result.current.value).toBe('Carla');
  })

  it('should set error when value is empty', () => {
    const { result } = renderHook(() => useForm('email'));

    act(() => {
      result.current.validate()
    })

    expect(result.current.error).toBe('Campo obrigatório');
  })

  it('should set error when value is invalid', () => {
    const { result } = renderHook(() => useForm('email'));

    act(() => {
      result.current.onChange({ target: { value: 'invalid_email' } } as any);
    })

     act(() => {
      result.current.onBlur();
     })

    expect(result.current.error).toBe('Email inválido');
  })

  it('should not set error when value is valid', () => {
    const { result } = renderHook(() => useForm('email'));

    act(() => {
      result.current.onChange({ target: { value: 'test@gmail.com' } } as any)
    })

    act(() => result.current.onBlur());

    expect(result.current.error).toBe(null);
  })

  it('should validate again on blur', () => {
    const { result } = renderHook(() => useForm('email'));

    act(() => {
      result.current.onChange({ target: { value: 'test@gmail.com' } } as any)
      result.current.onBlur();
    })

    expect(result.current.error).toBe('Campo obrigatório');
  })
})
