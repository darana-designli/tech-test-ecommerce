// AddToCart.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddToCart } from '../components/AddToCart'; // Update to the correct path if needed
import { useToast } from '@/hooks/use-toast';

// Mock the custom hooks
jest.mock('@/store/cart', () => ({
  useCartStore: jest.fn(() => ({
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    isProductInCart: jest.fn(),
  })),
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

describe('AddToCart', () => {
  const mockAddToCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockIsProductInCart = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test to prevent interference between tests
    mockAddToCart.mockClear();
    mockRemoveFromCart.mockClear();
    mockIsProductInCart.mockClear();
    mockToast.mockClear();

    // Update the return values of the mocked useCartStore and useToast
    require('@/store/cart').useCartStore.mockReturnValue({
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      isProductInCart: mockIsProductInCart,
    });

    require('@/hooks/use-toast').useToast.mockReturnValue({
      toast: mockToast,
    });
  });

  it('renders the button with correct text when the product is not in the cart', async () => {
    mockIsProductInCart.mockReturnValue(false); // Product is not in cart
    const product = { id: '1', title: 'Test Product' };

    render(<AddToCart product={product} />);

    await screen.findByRole('button')

    expect(screen.getByRole('button')).toHaveTextContent('Add to cart');
  });

  it('adds a product to the cart', () => {
    mockIsProductInCart.mockReturnValue(false); // Product initially not in cart
    const product = { id: '1', title: 'Test Product' };

    render(<AddToCart product={product} />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockAddToCart).toHaveBeenCalledWith(product);
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Product added successfully.',
      description: 'The product was added from the cart',
    });
  });

  it('removes a product from the cart', () => {
    mockIsProductInCart.mockReturnValue(true); // Product is in cart
    const product = { id: '1', title: 'Test Product' };

    render(<AddToCart product={product} />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockRemoveFromCart).toHaveBeenCalledWith(product.id);
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Product removed successfully.',
      description: 'The product was removed from the cart',
    });
  });

  it('displays correct button text when the product is in the cart', () => {
    mockIsProductInCart.mockReturnValue(true); // Product is in cart
    const product = { id: '1', title: 'Test Product' };

    render(<AddToCart product={product} />);

    expect(screen.getByRole('button')).toHaveTextContent('Remove from cart');
  });
});
