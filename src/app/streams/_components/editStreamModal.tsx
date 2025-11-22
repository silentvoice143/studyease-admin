import { DynamicModal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

interface EditStreamModalProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
}

function EditStreamModal({
  item,
  isSaving,
  isOpen,
  onClose,
  onSubmit,
}: EditStreamModalProps) {
  const [stream, setStream] = useState({ name: "", totalSemesters: 0 });
  useEffect(() => {
    if (isOpen) {
      setStream({ name: item.name, totalSemesters: item.totalSemesters });
    }
  }, [isOpen]);
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
            {isSaving ? "Saving..." : "Update"}
          </Button>
          <Button disabled={isSaving} variant={"outline"}>
            Cancel
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input
          value={stream.name}
          placeholder="Enter stream name"
          label="Stream Name"
          required
          onChange={(e) =>
            setStream((prev) => ({ ...prev, name: e.target.value.trim() }))
          }
        />
        <Input
          value={+stream.totalSemesters}
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

export default EditStreamModal;
