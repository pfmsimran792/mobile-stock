import { useEffect, useState } from "react";
import Modal from "./Modal";

interface SellModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onSave: (quantity: number) => void;
}

function SellModal({
  isOpen,
  productName,
  onClose,
  onSave,
}: SellModalProps) {
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuantity("");
    }
  }, [isOpen]);

  function handleSave() {
    const value = Number(quantity);

    if (value <= 0) {
      alert("Enter valid quantity");
      return;
    }

    onSave(value);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Sell Product"
      onClose={onClose}
    >
      <p className="mb-4 font-semibold">
        {productName}
      </p>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border rounded-lg w-full p-3"
        placeholder="Quantity"
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
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>

      </div>
    </Modal>
  );
}

export default SellModal;