import { AlertTriangle, Loader2 } from "lucide-react";
import { DynamicModal } from "./modal";
import { Button } from "../ui/button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  itemName?: string;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description,
  itemName,
  loading = false,
  confirmText = "Delete",
  cancelText = "Cancel",
}: ConfirmDeleteModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  const defaultDescription = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : "Are you sure you want to delete this item? This action cannot be undone.";

  return (
    <DynamicModal
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-[440px]"
      header={{
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span>{title}</span>
          </div>
        ),
        description: description || defaultDescription,
      }}
      footer={
        <div className="flex gap-2 w-full sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="text-sm text-muted-foreground">
        This will permanently delete the selected item from the system.
      </div>
    </DynamicModal>
  );
}
