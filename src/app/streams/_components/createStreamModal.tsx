import { DynamicModal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface CreateStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

function CreateStreamModal({
  isSaving,
  isOpen,
  onClose,
  onSubmit,
}: CreateStreamModalProps) {
  const [stream, setStream] = useState({ name: "", totalSemesters: 0 });
  return (
    <DynamicModal
      isOpen={isOpen}
      onClose={onClose}
      header={{ title: "Add Stream", description: "Add a new sream here" }}
      footer={
        <div className="">
          <Button
            disabled={isSaving}
            onClick={() => onSubmit(stream)}
            variant={"default"}
            className="bg-orange-500 mr-4"
          >
            {isSaving ? "Saving..." : "Create"}
          </Button>
          <Button disabled={isSaving} variant={"outline"}>
            Cancel
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input
          placeholder="Enter stream name"
          label="Stream Name"
          required
          onChange={(e) =>
            setStream((prev) => ({ ...prev, name: e.target.value.trim() }))
          }
        />
        <Input
          placeholder="Enter total sem"
          label="Total Sem"
          required
          type="number"
          onChange={(e) =>
            setStream((prev) => ({ ...prev, totalSemesters: +e.target.value }))
          }
        />
      </div>
    </DynamicModal>
  );
}

export default CreateStreamModal;
