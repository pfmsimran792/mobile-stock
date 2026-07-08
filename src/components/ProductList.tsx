import type { Product } from "../types/Product";

interface ProductListProps {
  products: Product[];
  onSell: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function ProductList({
  products,
  onSell,
  onEdit,
  onDelete,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Sold</th>
            <th className="text-center">Available</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const available = product.stock - product.sold;

            let status = (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                🟢 In Stock
              </span>
            );

            if (available > 0 && available <= 5) {
              status = (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  🟡 Low Stock
                </span>
              );
            }

            if (available === 0) {
              status = (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  🔴 Out of Stock
                </span>
              );
            }

            return (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{product.name}</td>

                <td className="text-center">{product.stock}</td>

                <td className="text-center">{product.sold}</td>

                <td className="text-center font-bold">
                  {available}
                </td>

                <td className="text-center">
                  {status}
                </td>

                <td className="text-center space-x-2 p-3">
                  <button
                    onClick={() => onSell(product.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                  >
                    Sell
                  </button>

                  <button
                    onClick={() => onEdit(product.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;