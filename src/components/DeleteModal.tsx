import Modal from "./Modal";

interface DeleteModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onDelete: () => void;
}

function DeleteModal({
  isOpen,
  productName,
  onClose,
  onDelete,
}: DeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title="Delete Product"
      onClose={onClose}
    >
      <div className="space-y-5">
        <p className="text-center text-lg">
          Are you sure you want to delete
        </p>

        <p className="text-center text-xl font-bold text-red-600">
          {productName}?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;