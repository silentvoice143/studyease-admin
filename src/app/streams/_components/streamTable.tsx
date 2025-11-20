"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  BookOpen,
  Calendar,
} from "lucide-react";
import { TablePagination } from "@/components/layout/tablePagination";

interface Stream {
  id: number;
  name: string;
  totalSemesters: number;
  subjectCount: number;
}

interface StreamsTableProps {
  data: Stream[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onExplore: (id: number) => void;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  totalPages?: number;
  totalCount?: number;
  loading?: { delete: boolean };
}

// Mock data - replace with actual API call
const mockStreams = [
  { id: 1, name: "Computer Science", totalSemesters: 8, subjectCount: 42 },
  {
    id: 2,
    name: "Mechanical Engineering",
    totalSemesters: 8,
    subjectCount: 38,
  },
  { id: 3, name: "Civil Engineering", totalSemesters: 8, subjectCount: 36 },
  {
    id: 4,
    name: "Electrical Engineering",
    totalSemesters: 8,
    subjectCount: 40,
  },
  {
    id: 5,
    name: "Electronics & Communication",
    totalSemesters: 8,
    subjectCount: 39,
  },
  {
    id: 6,
    name: "Business Administration",
    totalSemesters: 6,
    subjectCount: 32,
  },
  {
    id: 7,
    name: "Information Technology",
    totalSemesters: 8,
    subjectCount: 41,
  },
  { id: 8, name: "Chemical Engineering", totalSemesters: 8, subjectCount: 35 },
  { id: 9, name: "Architecture", totalSemesters: 10, subjectCount: 45 },
  { id: 10, name: "Biotechnology", totalSemesters: 8, subjectCount: 37 },
];

export const StreamsTable: React.FC<StreamsTableProps> = ({
  data = mockStreams,
  onEdit,
  onDelete,
  onExplore,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  totalPages = 1,
  totalCount = 0,
  loading,
}) => {
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "NA"
    );
  };

  const handleLimitChange = (newLimit: string) => {
    const limit = parseInt(newLimit);
    onItemsPerPageChange?.(limit);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-[10%]">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-[35%]">
                  Stream Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-[20%]">
                  Total Semesters
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-[15%]">
                  Subject Count
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider w-[20%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-slate-200/60">
              {data?.map((stream, index) => (
                <tr
                  key={`${stream?.id}-${index}`}
                  className="hover:bg-slate-50/80 transition-colors duration-200"
                >
                  {/* ID */}
                  <td className="px-6 py-4 break-words">
                    <div className="font-semibold text-slate-900 text-sm">
                      {stream?.id}
                    </div>
                  </td>

                  {/* Stream Info */}
                  <td className="px-6 py-4 break-words">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-medium text-sm shadow-sm">
                          {getInitials(stream?.name || "")}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">
                          {stream?.name || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Total Semesters */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-900">
                      <Calendar className="w-3 h-3 mr-2 text-slate-400" />
                      {stream?.totalSemesters || "N/A"}
                    </div>
                  </td>

                  {/* Subject Count */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-900">
                      <BookOpen className="w-3 h-3 mr-2 text-slate-400" />
                      {stream?.subjectCount || 0}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onExplore?.(stream?.id)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Explore Stream"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(stream?.id)}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                        title="Edit Stream"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => onExplore?.(stream?.id)}
                            className="cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Explore Stream
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => onEdit?.(stream?.id)}
                            className="cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Stream
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDelete?.(stream?.id)}
                            className="cursor-pointer !text-error hover:bg-error-light"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Use Global Pagination Component */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          limit={itemsPerPage}
          onPageChange={onPageChange || (() => {})}
          onLimitChange={handleLimitChange}
        />
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 px-2">
        {data?.map((stream, idx) => (
          <div
            key={`${stream?.id}-${idx}`}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-slate-200/50 border border-white/60"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-medium text-sm shadow-sm">
                    {getInitials(stream?.name || "")}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {stream?.name || "N/A"}
                  </div>
                  <div className="text-xs text-slate-600">ID: {stream?.id}</div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onExplore?.(stream?.id)}
                    className="cursor-pointer"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Explore
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => onEdit?.(stream?.id)}
                    className="cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete?.(stream?.id)}
                    className="cursor-pointer !text-error hover:bg-error-light"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-slate-600">
                <Calendar className="w-3 h-3 mr-2 text-slate-400" />
                Total Semesters: {stream?.totalSemesters || "N/A"}
              </div>

              <div className="flex items-center text-sm text-slate-600">
                <BookOpen className="w-3 h-3 mr-2 text-slate-400" />
                Subjects: {stream?.subjectCount || 0}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-3 pt-3 border-t border-slate-200/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExplore?.(stream?.id)}
                className="w-full gap-2"
              >
                <Eye className="h-4 w-4" />
                Explore Stream
              </Button>
            </div>
          </div>
        ))}

        {/* Mobile Pagination */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-white/60">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            limit={itemsPerPage}
            onPageChange={onPageChange || (() => {})}
            onLimitChange={handleLimitChange}
          />
        </div>
      </div>
    </div>
  );
};
