import { useState } from "react";

interface ProductFormProps {
  onAddProduct: (name: string, stock: number) => void;
}

function ProductForm({ onAddProduct }: ProductFormProps) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Enter product name");
      return;
    }

    const stockValue = Number(stock);

    if (stockValue <= 0) {
      alert("Stock must be greater than 0");
      return;
    }

    onAddProduct(name, stockValue);

    setName("");
    setStock("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 mb-6"
    >
      <h2 className="text-xl font-bold mb-4">
        Add Product
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border rounded-lg p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="border rounded-lg p-3"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <button
        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;