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
import { useParams, useRouter } from "next/navigation";
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
import { SubjectTable } from "../_components/subjectTable";
import { deleteSubject, getSubjects, postSubject } from "@/libs/apis/subject";
import CreateSubjectModal from "../_components/createSubjectModal";
import { ConfirmDeleteModal } from "@/components/common/confirmDelete";

function Stream() {
  const params = useParams();
  const streamId = params.id;
  const [semester, setSemester] = useState(6);
  const [subjects, setSubjects] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
  });
  const [selectedSem, setSelectedSem] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toggleCreateModal, setToggleCreateModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState<number | null>(
    null
  );

  const route = useRouter();

  const getStreamById = async (body: any) => {
    try {
    } catch (err) {
    } finally {
    }
  };

  const resetPagination = () => {
    setPagination({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  };

  const handleAddSubject = async (body: any) => {
    try {
      setIsSaving(true);
      const data = await postSubject({ ...body, streamId });
      if (data.success) {
        getSubjectsData(1, 10, selectedSem);
        setToggleCreateModal(false);
      } else {
      }
    } catch (err) {
    } finally {
      setIsSaving(false);
      setLoading(false);
    }
  };

  const getSubjectsData = async (
    page = 1,
    limit = 10,
    semester = 1,
    search = ""
  ) => {
    try {
      console.log(!streamId, loading);
      if (!streamId || loading) return;
      setLoading(true);
      const data = await getSubjects(page, limit, +streamId, semester);
      if (data.success) {
        setSubjects(data?.data);
        setPagination(data?.pagination);
      } else {
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const deleteSubjectData = async (id: any) => {
    try {
      if (!toggleDeleteModal) return;
      setIsSaving(true);
      const data = await deleteSubject(id.toString());
      if (data.success) {
        getSubjectsData(1, 10, selectedSem);
        setToggleDeleteModal(null);
      } else {
      }
    } catch (err) {
    } finally {
      setIsSaving(false);
    }
  };

  const semesterOptions = Array.from(
    { length: semester },
    (_, i) => `${i + 1}`
  );

  useEffect(() => {
    resetPagination();
    getSubjectsData(1, 10, selectedSem);
  }, [streamId]);

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
              <CardTitle className="text-2xl font-bold">Subjects</CardTitle>
              <CardDescription>
                Manage academic subject and their pyqs
              </CardDescription>
            </div>
            <div className="flex gap-4 justify-center items-end">
              <div className="space-y-2">
                <Label htmlFor="semester">Select Semester</Label>

                <Select
                  value={selectedSem.toString()}
                  onValueChange={(val) => {
                    setSelectedSem(+val);
                    resetPagination();
                    getSubjectsData(pagination.page, pagination.limit, +val);
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
              <Button
                onClick={() => {
                  setToggleCreateModal(true);
                }}
                className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600"
              >
                <Plus className="h-4 w-4" />
                Add Subject
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <SubjectTable
              data={subjects}
              onItemsPerPageChange={(limit) => {
                getSubjectsData(pagination.page, limit);
              }}
              onPageChange={(page) => getSubjectsData(page, pagination.limit)}
              onDelete={(id: number) => {
                setToggleDeleteModal(id);
              }}
              onEdit={(item: any) => {}}
              onExplore={(id: number) => {
                route.push(`/streams/${id}/${id}`);
              }}
              totalCount={pagination.total}
              itemsPerPage={pagination.limit}
              totalPages={pagination.totalPages}
              currentPage={pagination.page}
            />
          </CardContent>
        </Card>
      </div>
      <CreateSubjectModal
        isOpen={toggleCreateModal}
        onClose={() => setToggleCreateModal(false)}
        isSaving={isSaving}
        semesterOptions={semesterOptions}
        onSubmit={handleAddSubject}
      />
      <ConfirmDeleteModal
        isOpen={!!toggleDeleteModal}
        onClose={() => setToggleDeleteModal(null)}
        onConfirm={() => deleteSubjectData(toggleDeleteModal)}
        loading={isSaving}
      />
    </PageWithSidebar>
  );
}

export default Stream;
