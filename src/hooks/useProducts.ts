import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/Product";
import { loadProducts, saveProducts } from "../services/storage";

export type FilterType = "all" | "low" | "out";
export type SortType =
  | "name-asc"
  | "name-desc"
  | "stock-desc"
  | "stock-asc";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(loadProducts());
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("name-asc");

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addProduct = (name: string, stock: number) => {
    setProducts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        stock,
        sold: 0,
      },
    ]);
  };

  const updateStock = (id: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock } : p
      )
    );
  };

  const sellProduct = (id: string, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        if (p.sold + quantity > p.stock) {
          alert("Cannot sell more than available stock.");
          return p;
        }

        return {
          ...p,
          sold: p.sold + quantity,
        };
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };
  const replaceProducts = (newProducts: Product[]) => {
  setProducts(newProducts);
};
  const filteredProducts = useMemo(() => {
    let data = [...products];

    data = data.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filter === "low") {
      data = data.filter((p) => {
        const available = p.stock - p.sold;
        return available > 0 && available <= 5;
      });
    }

    if (filter === "out") {
      data = data.filter(
        (p) => p.stock - p.sold === 0
      );
    }

    switch (sort) {
      case "name-desc":
        data.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      case "stock-desc":
        data.sort((a, b) => b.stock - a.stock);
        break;

      case "stock-asc":
        data.sort((a, b) => a.stock - b.stock);
        break;

      default:
        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
    }

    return data;
  }, [products, search, filter, sort]);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, p) => sum + p.stock,
    0
  );

  const totalSold = products.reduce(
    (sum, p) => sum + p.sold,
    0
  );

  const totalAvailable = products.reduce(
    (sum, p) => sum + (p.stock - p.sold),
    0
  );

  const lowStockCount = products.filter((p) => {
    const available = p.stock - p.sold;
    return available > 0 && available <= 5;
  }).length;

  const outOfStockCount = products.filter(
    (p) => p.stock - p.sold === 0
  ).length;

  return {
  products,
  filteredProducts,
  replaceProducts,

  search,
  setSearch,

  filter,
  setFilter,

  sort,
  setSort,

  addProduct,
  updateStock,
  sellProduct,
  deleteProduct,

  totalProducts,
  totalStock,
  totalSold,
  totalAvailable,
  lowStockCount,
  outOfStockCount,
};
}