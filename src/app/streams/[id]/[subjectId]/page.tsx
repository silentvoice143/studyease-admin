"use client";
import PageWithSidebar from "@/components/layout/pageWithSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ConfirmDeleteModal } from "@/components/common/confirmDelete";
import UploadNotesModal from "../../_components/uploadNotes";
import {
  deleteNote,
  deletePyq,
  getNotes,
  getPyqs,
} from "@/libs/apis/notes_pyq";
import { NotesTable } from "../../_components/noteTable";
import UploadPyqModal from "../../_components/uploadPYQ";

function NotesPyq() {
  const params = useParams();
  const subjectId = params.subjectId;
  const [notes, setNotes] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
  });
  const [pyqs, setPyqs] = useState([]);
  const [pyq_pagination, setPyqPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(false);
  const [loadingPyq, setLoadingPyq] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toggleCreateModal, setToggleCreateModal] = useState(false);
  const [toggleCreatePyqModal, setToggleCreatePyqModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState<number | null>(
    null
  );
  const [toggleDeletePyqModal, setToggleDeletePyqModal] = useState<
    number | null
  >(null);

  const resetPagination = () => {
    setPagination({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  };

  const resetPyqPagination = () => {
    setPyqPagination({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  };

  const getNotesData = async (page = 1, limit = 10, search = "") => {
    try {
      console.log(!subjectId, loading);
      if (!subjectId || loading) return;
      setLoading(true);
      const data = await getNotes(page, limit, +subjectId);
      if (data.success) {
        setNotes(data?.data);
        setPagination(data?.pagination);
      } else {
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const deleteNoteData = async (id: any) => {
    try {
      if (!toggleDeleteModal) return;
      setIsSaving(true);
      const data = await deleteNote(id.toString());
      if (data.success) {
        getNotesData(pagination.page, pagination.limit);
        setToggleDeleteModal(null);
      } else {
      }
    } catch (err) {
    } finally {
      setIsSaving(false);
    }
  };

  const getPyqsData = async (page = 1, limit = 10, search = "") => {
    try {
      console.log(!subjectId, loading);
      if (!subjectId || loading) return;
      setLoadingPyq(true);
      const data = await getPyqs(page, limit, +subjectId);
      if (data.success) {
        setPyqs(data?.data);
        setPyqPagination(data?.pagination);
      } else {
      }
    } catch (err) {
    } finally {
      setLoadingPyq(false);
    }
  };

  const deletePyqData = async (id: any) => {
    try {
      if (!toggleDeletePyqModal) return;
      setIsSaving(true);
      const data = await deletePyq(id.toString());
      if (data.success) {
        getPyqsData(pagination.page, pagination.limit);
        setToggleDeletePyqModal(null);
      } else {
      }
    } catch (err) {
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    resetPagination();
    resetPyqPagination();
    getNotesData(1, 10);
    getPyqsData(1, 10);
  }, [subjectId]);

  return (
    <PageWithSidebar>
      {/* <div className="px-8 py-8">
        <div>Stream {params.id}</div>
        <div className="mt-6 space-y-2">
          <Label htmlFor="semester">Select Semester</Label>

          <Select
            value={selectedSem.toString()}
            onValueChange={(val) => setSelectedSem(+val)}
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
      </div> */}

      <div className="container mx-auto py-6 space-y-6 px-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">Notes</CardTitle>
              <CardDescription>Manage academic notes</CardDescription>
            </div>
            <div className="flex gap-4 justify-center items-end">
              <Button
                onClick={() => {
                  setToggleCreateModal(true);
                }}
                className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600"
              >
                <Plus className="h-4 w-4" />
                Add Note
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <NotesTable
              data={notes}
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalCount={pagination.total}
              itemsPerPage={pagination.limit}
              onPageChange={(p) => getNotesData(p, pagination.limit)}
              onItemsPerPageChange={(l) => getNotesData(pagination.page, l)}
              onDelete={(id) => setToggleDeleteModal(id)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">PYQ</CardTitle>
              <CardDescription>Manage academic pyqs</CardDescription>
            </div>
            <div className="flex gap-4 justify-center items-end">
              <Button
                onClick={() => {
                  setToggleCreatePyqModal(true);
                }}
                className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600"
              >
                <Plus className="h-4 w-4" />
                Add Pyq
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <NotesTable
              data={pyqs}
              currentPage={pyq_pagination.page}
              totalPages={pyq_pagination.totalPages}
              totalCount={pyq_pagination.total}
              itemsPerPage={pyq_pagination.limit}
              onPageChange={(p) => getPyqsData(p, pagination.limit)}
              onItemsPerPageChange={(l) => getPyqsData(pagination.page, l)}
              onDelete={(id) => setToggleDeletePyqModal(id)}
            />
          </CardContent>
        </Card>
      </div>

      <ConfirmDeleteModal
        isOpen={!!toggleDeleteModal || !!toggleDeletePyqModal}
        onClose={() => setToggleDeleteModal(null)}
        onConfirm={() => {
          if (toggleDeleteModal) {
            deleteNoteData(toggleDeleteModal);
          } else {
            deletePyqData(toggleDeletePyqModal);
          }
        }}
        loading={isSaving}
      />
      <UploadNotesModal
        isOpen={toggleCreateModal}
        subjectId={subjectId as string}
        onClose={() => setToggleCreateModal(false)}
        onUploadSuccess={() => getNotesData(pagination.page, pagination.limit)}
      />
      <UploadPyqModal
        isOpen={toggleCreatePyqModal}
        subjectId={subjectId as string}
        onClose={() => setToggleCreatePyqModal(false)}
        onUploadSuccess={() => getPyqsData(pagination.page, pagination.limit)}
      />
    </PageWithSidebar>
  );
}

export default NotesPyq;
