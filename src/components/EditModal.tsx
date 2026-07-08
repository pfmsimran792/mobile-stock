import { useEffect, useState } from "react";
import Modal from "./Modal";

interface EditModalProps {
  isOpen: boolean;
  productName: string;
  currentStock: number;
  onClose: () => void;
  onSave: (stock: number) => void;
}

function EditModal({
  isOpen,
  productName,
  currentStock,
  onClose,
  onSave,
}: EditModalProps) {
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStock(currentStock.toString());
    }
  }, [isOpen, currentStock]);

  function handleSave() {
    const value = Number(stock);

    if (value < 0) {
      alert("Stock cannot be negative.");
      return;
    }

    onSave(value);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Edit Product"
      onClose={onClose}
    >
      <p className="mb-2 font-semibold">{productName}</p>

      <input
        type="number"
        min="0"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full border rounded-lg p-3"
        placeholder="Enter stock"
      />

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={onClose}
          className="border px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export default EditModal;