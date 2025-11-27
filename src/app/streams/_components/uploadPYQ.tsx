import React, { useEffect, useState } from "react";
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
import { X, Plus, FileText, AlertCircle } from "lucide-react";
import { bulkCreatePyqs } from "@/libs/apis/notes_pyq";
import { DynamicModal } from "@/components/common/modal";

interface PyqFormData {
  title: string;
  year: string;
  subjectId: string;
  file: File | null;
  fileUrl?: string;
}

interface UploadPyqModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: string;
  onUploadSuccess?: () => void;
}

export default function UploadPyqModal({
  isOpen,
  onClose,
  subjectId,
  onUploadSuccess,
}: UploadPyqModalProps) {
  const [pyqs, setPyqs] = useState<PyqFormData[]>([
    { title: "", year: "", subjectId, file: null },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );

  useEffect(() => {
    if (isOpen) {
      setPyqs([{ title: "", year: "", subjectId, file: null }]);
      setError(null);
    }
  }, [isOpen, subjectId]);

  const handleAddPyq = () => {
    setPyqs([...pyqs, { title: "", year: "", subjectId, file: null }]);
  };

  const handleRemovePyq = (index: number) => {
    if (pyqs.length > 1) {
      setPyqs(pyqs.filter((_, i) => i !== index));
    }
  };

  const handlePyqChange = (
    index: number,
    field: keyof PyqFormData,
    value: string | File | null
  ) => {
    const updated = [...pyqs];
    updated[index] = { ...updated[index], [field]: value };
    setPyqs(updated);
  };

  const validatePyqs = (): boolean => {
    for (let i = 0; i < pyqs.length; i++) {
      const p = pyqs[i];

      if (!p.title.trim()) {
        setError(`PYQ ${i + 1}: Title is required`);
        return false;
      }
      if (!p.year) {
        setError(`PYQ ${i + 1}: Year is required`);
        return false;
      }
      if (!p.subjectId) {
        setError(`PYQ ${i + 1}: Subject is missing`);
        return false;
      }
      if (!p.file && !p.fileUrl) {
        setError(`PYQ ${i + 1}: File is required`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(null);

    if (!validatePyqs()) return;

    setLoading(true);
    try {
      const payload = pyqs.map((p) => ({
        title: p.title,
        year: p.year,
        subjectId,
        file: p.file,
        fileUrl: p.fileUrl,
      }));

      const res = await bulkCreatePyqs(payload);

      if (res.success) {
        onUploadSuccess?.();
        handleClose();
      } else {
        setError(res.message || "Failed to upload PYQs");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || "Failed to upload PYQs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPyqs([{ title: "", year: "", subjectId, file: null }]);
    setError(null);
    onClose();
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onClose={handleClose}
      className="sm:max-w-[700px]"
      header={{
        title: (
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Upload PYQs</span>
          </div>
        ),
        description: "Add one or multiple Previous Year Question papers",
      }}
      footer={
        <div className="flex justify-between w-full gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            {loading
              ? "Uploading..."
              : `Upload ${pyqs.length} PYQ${pyqs.length > 1 ? "s" : ""}`}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-3">
          {pyqs.map((pyq, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg p-4 space-y-4 relative bg-white hover:border-gray-300 transition-colors"
            >
              {pyqs.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleRemovePyq(index)}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              <div className="flex items-center gap-2 pb-2 border-b">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-700">
                    {index + 1}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  PYQ Details
                </span>
              </div>

              <div className="space-y-3">
                {/* Title */}
                <div>
                  <Label
                    htmlFor={`title-${index}`}
                    className="text-sm font-medium"
                  >
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`title-${index}`}
                    placeholder="e.g., Physics 2021"
                    value={pyq.title}
                    onChange={(e) =>
                      handlePyqChange(index, "title", e.target.value)
                    }
                    className="mt-1.5"
                  />
                </div>

                {/* Year */}
                <div>
                  <Label
                    htmlFor={`year-${index}`}
                    className="text-sm font-medium"
                  >
                    Year <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={pyq.year}
                    onValueChange={(value) =>
                      handlePyqChange(index, "year", value)
                    }
                  >
                    <SelectTrigger id={`year-${index}`} className="mt-1.5">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* File */}
                <div>
                  <Label
                    htmlFor={`file-${index}`}
                    className="text-sm font-medium"
                  >
                    Upload File <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`file-${index}`}
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) =>
                      handlePyqChange(
                        index,
                        "file",
                        e.target.files?.[0] || null
                      )
                    }
                    className="mt-1.5 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />

                  {pyq.file && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="truncate">{pyq.file.name}</span>
                      <span className="text-gray-400 ml-auto">
                        ({(pyq.file.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full border-dashed border-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          onClick={handleAddPyq}
          disabled={loading}
          type="button"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another PYQ
        </Button>
      </div>
    </DynamicModal>
  );
}
