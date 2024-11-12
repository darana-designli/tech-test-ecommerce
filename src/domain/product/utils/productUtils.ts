import { Product } from "../ProductType";

/**
 * Cleans up image URLs by checking if it's a valid stringified array or just a string.
 * If the URL contains 'placeimg.com' with 'any', it returns a default image URL.
 * @param imageUrl - A string representing an image URL or an array string containing the URL.
 * @returns A clean string URL for the image or a default image URL if the URL is invalid.
 */
export const cleanImageUrl = (imageUrl: string): string => {
  const defaultImageUrl = 'https://i.ibb.co/M68TcKW/default-placeholder.png';
  try {
    const parsedUrls = JSON.parse(imageUrl);

    if (Array.isArray(parsedUrls) && parsedUrls.length > 0) {
      const url = parsedUrls[0];

      if (isUrlFromWrongSource(imageUrl)) {
        return defaultImageUrl;
      }

      return url;
    }
  } catch (error) {
    console.error('Error parsing image URL:', error);
  }

  if (isUrlFromWrongSource(imageUrl)) {
    return defaultImageUrl; 
  }

  return imageUrl;
};

const isUrlFromWrongSource = (imageUrl: string) => {
  return (imageUrl?.includes('placeimg.com') && imageUrl?.includes('any')) || imageUrl?.includes('google'); 
}

/**
 * Formats a given price number to a currency format with two decimal places.
 * @param price - The product price as a number.
 * @returns The price formatted as a string with a "$" symbol and two decimal points.
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getMaxPrice = (products: Product[]): number => {
  return products.reduce((max, product) => Math.max(max, product.price), 0);
};