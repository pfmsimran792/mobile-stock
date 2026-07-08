import type { Product } from "../types/Product";

const STORAGE_KEY = "mobile-shop-stock";

export function loadProducts(): Product[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}