"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ExternalLink } from "lucide-react";
import PageWithSidebar from "@/components/layout/pageWithSidebar";
import { StreamsTable } from "./_components/streamTable";
import CreateStreamModal from "./_components/createStreamModal";
import {
  deleteStream,
  editStream,
  getStreams,
  postStreams,
} from "@/libs/apis/stream";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmDeleteModal } from "@/components/common/confirmDelete";
import EditStreamModal from "./_components/editStreamModal";

function Streams() {
  const [streams, setStreams] = useState<any[]>([]);
  const [loadingSream, setLoadingStream] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [toggleCreateModal, setToggleCreateModal] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState<null | {
    id: number;
    name: string;
    totalSemesters: number;
  }>(null);
  const [toggleDeleteModal, setToggleDeleteModal] = useState<null | number>(
    null
  );

  const route = useRouter();

  const handleEditStream = async (body: any) => {
    console.log(body, "----body");
    try {
      setSaving(true);
      const data = await editStream({ id: toggleEditModal?.id, data: body });

      if (data.success) {
        toast.success("Stream updated successfully");
        getStreamsData(pagination.page, pagination.limit, true);
        setToggleEditModal(null);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
    } finally {
      setSaving(false);
    }
  };
  const handleDeleteStream = async (id: any) => {
    try {
      setSaving(true);
      const data = await deleteStream(id);

      if (data.success) {
        toast.success("Stream deleted successfully");
        getStreamsData(pagination.page, pagination.limit, true);
        setToggleDeleteModal(null);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
    } finally {
      setSaving(false);
    }
  };

  const handleAddStream = async (body: any) => {
    try {
      setSaving(true);
      const data = await postStreams(body);

      if (data.success) {
        toast.success("Stream added successfully");
        getStreamsData(pagination.page, pagination.limit, true);
        setToggleCreateModal(false);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
    } finally {
      setSaving(false);
    }
  };

  const getStreamsData = async (
    page = 1,
    limit = 10,
    silent = false,
    search = ""
  ) => {
    if (page > pagination.totalPages || loadingSream) return;
    if (!silent) {
      setLoadingStream(true);
    }
    try {
      const data: any = await getStreams(page, limit);

      if (data.success) {
        setPagination({
          page: data.page,
          total: data.total,
          totalPages: data.totalPages,
          limit: data.limit,
        });
        setStreams(data.streams);
      }
    } catch (err: any) {
    } finally {
      setLoadingStream(false);
    }
  };

  useEffect(() => {
    getStreamsData(1, 10);
  }, []);

  return (
    <PageWithSidebar>
      <div className="container mx-auto py-6 space-y-6 px-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">Streams</CardTitle>
              <CardDescription>
                Manage academic streams and their subjects
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                setToggleCreateModal(true);
              }}
              className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600"
            >
              <Plus className="h-4 w-4" />
              Add Stream
            </Button>
          </CardHeader>
          <CardContent>
            <StreamsTable
              data={streams}
              onItemsPerPageChange={(limit) => {
                getStreamsData(pagination.page, limit);
              }}
              onPageChange={(page) => getStreamsData(page, pagination.limit)}
              onDelete={(id: number) => {
                setToggleDeleteModal(id);
              }}
              onEdit={(item: any) => {
                setToggleEditModal(item);
              }}
              onExplore={(id: number) => {
                route.push(`/streams/${id}`);
              }}
              totalCount={pagination.total}
              itemsPerPage={pagination.limit}
              totalPages={pagination.totalPages}
              currentPage={pagination.page}
            />
          </CardContent>
        </Card>
      </div>
      <CreateStreamModal
        isOpen={toggleCreateModal}
        onClose={() => setToggleCreateModal(false)}
        onSubmit={handleAddStream}
        isSaving={saving}
      />
      <EditStreamModal
        isOpen={!!toggleEditModal}
        onClose={() => setToggleEditModal(null)}
        onSubmit={handleEditStream}
        item={toggleEditModal}
        isSaving={saving}
      />
      <ConfirmDeleteModal
        isOpen={!!toggleDeleteModal}
        onClose={() => setToggleDeleteModal(null)}
        onConfirm={() => handleDeleteStream(toggleDeleteModal)}
        loading={saving}
      />
    </PageWithSidebar>
  );
}

export default Streams;
