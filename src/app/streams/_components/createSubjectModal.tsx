import { DynamicModal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSaving?: boolean;
  semesterOptions: any[];
}

function CreateSubjectModal({
  isSaving,
  isOpen,
  onClose,
  onSubmit,
  semesterOptions,
}: CreateSubjectModalProps) {
  const [subject, setSubject] = useState({ name: "", semester: 1 });
  return (
    <DynamicModal
      isOpen={isOpen}
      onClose={onClose}
      header={{ title: "Add Subject", description: "Add a new subjecct here" }}
      footer={
        <div className="">
          <Button
            disabled={isSaving}
            onClick={() => onSubmit(subject)}
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
          placeholder="Enter subject name"
          label="Subject Name"
          required
          onChange={(e) =>
            setSubject((prev) => ({ ...prev, name: e.target.value.trim() }))
          }
        />
        <div className="space-y-2">
          <Label htmlFor="semester">Select Semester</Label>

          <Select
            value={subject.semester.toString()}
            onValueChange={(val) => {
              setSubject((prev) => ({ ...prev, semester: +val }));
            }}
          >
            <SelectTrigger id="semester" className="w-[180px]">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>

            <SelectContent>
              {semesterOptions.map((num) => (
                <SelectItem key={num} value={num}>
                  Semester {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </DynamicModal>
  );
}

export default CreateSubjectModal;
