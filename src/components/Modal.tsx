interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[95%] max-w-md">

        <div className="flex justify-between items-center border-b p-4">

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <div className="p-5">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;