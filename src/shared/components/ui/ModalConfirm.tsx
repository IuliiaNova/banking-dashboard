// src/shared/components/ui/ConfirmModal.tsx
import { useEffect, useRef } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

export const ModalConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "Do you really want to proceed with this action?",
}: ConfirmModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div
        ref={modalRef}
        className="w-full max-w-sm p-6 rounded-lg shadow-lg bg-white dark:bg-bd-background-dark text-gray-800 dark:text-white"
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
