"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: {
    title: React.ReactNode;
    description?: React.ReactNode;
  };
  children: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  className?: string;
  childrenContainerClassName?: string;
  preventAutoFocus?: boolean;
}

export function DynamicModal({
  className,
  isOpen,
  onClose,
  header,
  children,
  preventAutoFocus = false,
  footer,
  loading,
  childrenContainerClassName,
}: DynamicModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onOpenAutoFocus={
          preventAutoFocus ? (e) => e.preventDefault() : undefined
        }
        className={`sm:max-w-[620px] max-h-[90vh] overflow-hidden flex flex-col ${className}`}
      >
        {loading && <Loader2 className="animate-spin duration-75" />}
        <DialogHeader>
          <DialogTitle>{header.title}</DialogTitle>
          {header.description && (
            <DialogDescription>{header.description}</DialogDescription>
          )}
        </DialogHeader>

        <div
          className={`flex-1 overflow-y-auto py-4 scrollbar-hidden ${childrenContainerClassName}`}
        >
          {children}
        </div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
