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
import { createBulkNotes } from "@/libs/apis/notes_pyq";
import { DynamicModal } from "@/components/common/modal";

interface NoteFormData {
  title: string;
  year: string;
  subjectId: string;
  file: File | null;
  fileUrl?: string;
}

interface UploadNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: string;
  onUploadSuccess?: () => void;
}

export default function UploadNotesModal({
  isOpen,
  onClose,
  subjectId,
  onUploadSuccess,
}: UploadNotesModalProps) {
  const [notes, setNotes] = useState<NoteFormData[]>([
    { title: "", year: "", subjectId: subjectId, file: null },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );

  // Update notes when subjectId changes
  useEffect(() => {
    if (isOpen && subjectId) {
      setNotes([{ title: "", year: "", subjectId: subjectId, file: null }]);
      setError(null);
    }
  }, [isOpen, subjectId]);

  const handleAddNote = () => {
    setNotes([
      ...notes,
      { title: "", year: "", subjectId: subjectId, file: null },
    ]);
  };

  const handleRemoveNote = (index: number) => {
    if (notes.length > 1) {
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  const handleNoteChange = (
    index: number,
    field: keyof NoteFormData,
    value: string | File | null
  ) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = { ...updatedNotes[index], [field]: value };
    setNotes(updatedNotes);
  };

  const handleFileChange = (index: number, file: File | null) => {
    handleNoteChange(index, "file", file);
  };

  const validateNotes = (): boolean => {
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];

      if (!note.title.trim()) {
        setError(`Note ${i + 1}: Title is required`);
        return false;
      }
      if (!note.year) {
        setError(`Note ${i + 1}: Year is required`);
        return false;
      }
      if (!note.subjectId) {
        setError(`Note ${i + 1}: Subject is missing`);
        return false;
      }
      if (!note.file && !note.fileUrl) {
        setError(`Note ${i + 1}: File is required`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(null);

    if (!validateNotes()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare notes array with file objects
      const notesArray = notes.map((note) => ({
        title: note.title,
        year: note.year,
        subjectId: subjectId, // Use the prop directly
        file: note.file,
        fileUrl: note.fileUrl,
      }));

      // Call the API
      const data = await createBulkNotes(notesArray);

      // Success
      if (data.success) {
        onUploadSuccess?.();
        handleClose();
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || "Failed to upload notes"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNotes([{ title: "", year: "", subjectId: subjectId, file: null }]);
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
            <span>Upload Notes</span>
          </div>
        ),
        description: "Add one or multiple notes with files for this subject",
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
              : `Upload ${notes.length} Note${notes.length > 1 ? "s" : ""}`}
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
          {notes.map((note, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg p-4 space-y-4 relative bg-white hover:border-gray-300 transition-colors"
            >
              {notes.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleRemoveNote(index)}
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
                  Note Details
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <Label
                    htmlFor={`title-${index}`}
                    className="text-sm font-medium"
                  >
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`title-${index}`}
                    placeholder="e.g., Chapter 5 - Thermodynamics"
                    value={note.title}
                    onChange={(e) =>
                      handleNoteChange(index, "title", e.target.value)
                    }
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label
                    htmlFor={`year-${index}`}
                    className="text-sm font-medium"
                  >
                    Year <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={note.year}
                    onValueChange={(value) =>
                      handleNoteChange(index, "year", value)
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
                      handleFileChange(index, e.target.files?.[0] || null)
                    }
                    className="mt-1.5 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {note.file && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="truncate">{note.file.name}</span>
                      <span className="text-gray-400 ml-auto">
                        ({(note.file.size / 1024).toFixed(2)} KB)
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
          onClick={handleAddNote}
          type="button"
          disabled={loading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Note
        </Button>
      </div>
    </DynamicModal>
  );
}
