import { useEffect, useState } from "react";
import Modal from "./Modal";

interface EditModalProps {
  isOpen: boolean;
  productName: string;
  currentStock: number;
  onClose: () => void;
  onSave: (quantity: number) => void;
}

function EditModal({
  isOpen,
  productName,
  currentStock,
  onClose,
  onSave,
}: EditModalProps) {
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuantity("");
    }
  }, [isOpen]);

  function handleSave() {
    const value = Number(quantity);

    if (value <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    onSave(value);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Add Stock"
      onClose={onClose}
    >
      <p className="mb-2 font-semibold">{productName}</p>

      <p className="text-gray-600 mb-4">
        Current Stock: <strong>{currentStock}</strong>
      </p>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full border rounded-lg p-3"
        placeholder="Enter new stock received"
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
          Add Stock
        </button>
      </div>
    </Modal>
  );
}

export default EditModal;