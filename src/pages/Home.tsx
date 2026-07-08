import { useState, useRef } from "react";
import { exportProductsToExcel } from "../services/exportExcel";
import { importProductsFromExcel } from "../services/importExcel";

import Dashboard from "../components/Dashboard";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import SellModal from "../components/SellModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

import { useProducts } from "../hooks/useProducts";

function Home() {
  const {
    products,
    filteredProducts,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
    addProduct,
    deleteProduct,
    sellProduct,
    updateStock,
    replaceProducts,
    totalProducts,
    totalStock,
    totalSold,
    totalAvailable,
    lowStockCount,
    outOfStockCount,
  } = useProducts();

  // Sell Modal
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const [editProductName, setEditProductName] = useState("");
  const [editCurrentStock, setEditCurrentStock] = useState(0);

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [deleteProductName, setDeleteProductName] = useState("");

  // Import Excel
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImport(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const importedProducts =
        await importProductsFromExcel(file);

      replaceProducts(importedProducts);

      alert("Inventory imported successfully!");
    } catch {
      alert("Failed to import Excel file.");
    }

    event.target.value = "";
  }

  function handleSellClick(id: string) {
    const product = filteredProducts.find((p) => p.id === id);

    if (!product) return;

    setSelectedProductId(product.id);
    setSelectedProductName(product.name);
    setSellModalOpen(true);
  }

  function handleEditClick(id: string) {
    const product = filteredProducts.find((p) => p.id === id);

    if (!product) return;

    setEditProductId(product.id);
    setEditProductName(product.name);
    setEditCurrentStock(product.stock);
    setEditModalOpen(true);
  }

  function handleDeleteClick(id: string) {
    const product = filteredProducts.find((p) => p.id === id);

    if (!product) return;

    setDeleteProductId(product.id);
    setDeleteProductName(product.name);
    setDeleteModalOpen(true);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Dashboard
        totalProducts={totalProducts}
        totalStock={totalStock}
        totalSold={totalSold}
        totalAvailable={totalAvailable}
        lowStockCount={lowStockCount}
        outOfStockCount={outOfStockCount}
      />

      {/* Export / Import */}
      <div className="flex flex-wrap justify-end gap-3 mb-6">
        <button
          onClick={() => exportProductsToExcel(products)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg shadow"
        >
          📤 Export Excel
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
        >
          📥 Import Excel
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      <ProductForm onAddProduct={addProduct} />

      <SearchBar
        search={search}
        onSearchChange={setSearch}
      />

      {/* Filter & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border rounded-lg p-3"
        >
          <option value="all">All Products</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="border rounded-lg p-3"
        >
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="stock-desc">Stock High → Low</option>
          <option value="stock-asc">Stock Low → High</option>
        </select>
      </div>

      <ProductList
        products={filteredProducts}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
        onSell={handleSellClick}
      />

      <SellModal
        isOpen={sellModalOpen}
        productName={selectedProductName}
        onClose={() => setSellModalOpen(false)}
        onSave={(quantity) => {
          sellProduct(selectedProductId, quantity);
        }}
      />

      <EditModal
        isOpen={editModalOpen}
        productName={editProductName}
        currentStock={editCurrentStock}
        onClose={() => setEditModalOpen(false)}
        onSave={(stock) => {
          updateStock(editProductId, stock);
        }}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        productName={deleteProductName}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => {
          deleteProduct(deleteProductId);
        }}
      />
    </div>
  );
}

export default Home;