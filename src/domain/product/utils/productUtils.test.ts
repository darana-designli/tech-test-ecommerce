// cleanImageUrl.test.ts
import { cleanImageUrl, formatPrice, getMaxPrice } from './productUtils';
import { Product } from '../ProductType';

describe('cleanImageUrl', () => {
  const defaultImageUrl = 'https://i.ibb.co/M68TcKW/default-placeholder.png';

  it('returns first URL from a valid stringified array', () => {
    const imageUrl = JSON.stringify(['https://example.com/image1.jpg', 'https://example.com/image2.jpg']);
    expect(cleanImageUrl(imageUrl)).toBe('https://example.com/image1.jpg');
  });

  it('returns imageUrl if it is a regular valid string', () => {
    const imageUrl = 'https://example.com/image.jpg';
    expect(cleanImageUrl(imageUrl)).toBe(imageUrl);
  });

  it('returns default image URL if imageUrl contains placeimg.com with "any"', () => {
    const imageUrl = 'https://placeimg.com/640/480/any';
    expect(cleanImageUrl(imageUrl)).toBe(defaultImageUrl);
  });

  it('returns default image URL if imageUrl contains "google"', () => {
    const imageUrl = 'https://google.com/image.jpg';
    expect(cleanImageUrl(imageUrl)).toBe(defaultImageUrl);
  });

  it('returns imageUrl if JSON parsing fails and it does not contain a restricted source', () => {
    const imageUrl = 'invalidJsonString';
    expect(cleanImageUrl(imageUrl)).toBe(imageUrl);
  });

  it('returns default image URL if JSON parsing fails and it contains a restricted source', () => {
    const imageUrl = 'placeimg.com/any';
    expect(cleanImageUrl(imageUrl)).toBe(defaultImageUrl);
  });
});

describe('getMaxPrice', () => {
  it('returns the highest price in a list of products', () => {
    const products: Product[] = [
      { id: '1', price: 20 },
      { id: '2', price: 100 },
      { id: '3', price: 50 },
    ];
    expect(getMaxPrice(products)).toBe(100);
  });

  it('returns 0 if the products array is empty', () => {
    const products: Product[] = [];
    expect(getMaxPrice(products)).toBe(0);
  });

  it('handles negative prices correctly', () => {
    const products: Product[] = [
      { id: '1', price: -10 },
      { id: '2', price: -50 },
      { id: '3', price: -1 },
    ];
    expect(getMaxPrice(products)).toBe(0);
  });
});

describe('formatPrice', () => {
  it('formats a positive price with two decimal places', () => {
    expect(formatPrice(1234.56)).toBe('$1,234.56');
  });

  it('formats a price with no decimal places', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
  });

  it('formats a negative price with two decimal places', () => {
    expect(formatPrice(-99.99)).toBe('-$99.99');
  });

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});
