import * as XLSX from "xlsx";
import type { Product } from "../types/Product";

export function exportProductsToExcel(products: Product[]) {
  const data = products.map((product) => ({
    Product: product.name,
    Stock: product.stock,
    Sold: product.sold,
    Available: product.stock - product.sold,
    Status:
      product.stock - product.sold === 0
        ? "Out of Stock"
        : product.stock - product.sold <= 5
        ? "Low Stock"
        : "In Stock",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Inventory"
  );

  const today = new Date().toISOString().split("T")[0];

  XLSX.writeFile(workbook, `Inventory_${today}.xlsx`);
}