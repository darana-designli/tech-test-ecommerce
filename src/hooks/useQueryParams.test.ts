// useQueryParams.test.ts
import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useQueryParams } from '@/hooks/useQueryParams';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams('')),
}));

describe('useQueryParams Hook', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
  });

  test('should set a query parameter correctly', () => {
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParams({ title: 'Test' });
    });

    expect(mockPush).toHaveBeenCalledWith('?title=Test');
  });

  test('should update multiple query parameters', () => {
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParams({ title: 'Test', page: 2 });
    });

    expect(mockPush).toHaveBeenCalledWith('?title=Test&page=2');
  });

  test('should remove a query parameter when value is undefined', () => {
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.setQueryParams({ title: undefined });
    });

    expect(mockPush).toHaveBeenCalledWith('?');
  });
});
