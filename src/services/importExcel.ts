import * as XLSX from "xlsx";
import type { Product } from "../types/Product";

export function importProductsFromExcel(
  file: File
): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;

        const workbook = XLSX.read(data, {
          type: "binary",
        });

        const sheet =
          workbook.Sheets[workbook.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json<any>(sheet);

        const products: Product[] = rows.map((row) => ({
          id: crypto.randomUUID(),
          name: row.Product,
          stock: Number(row.Stock),
          sold: Number(row.Sold),
        }));

        resolve(products);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsBinaryString(file);
  });
}