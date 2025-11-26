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

interface Subject {
  id: number;
  name: string;
  semester: number;
  notesCount: number;
  pyqsCount: number;
}

interface SubjectTableProps {
  data: Subject[];
  onEdit: (item: any) => void;
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

export const SubjectTable: React.FC<SubjectTableProps> = ({
  data,
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-[35%]">
                  Subject Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-[20%]">
                  Total Notes
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-[15%]">
                  Total PYQs
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider w-[20%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-slate-200/60">
              {data?.map((subject, index) => (
                <tr
                  key={`${subject?.id}-${index}`}
                  className="hover:bg-slate-50/80 transition-colors duration-200"
                >
                  {/* Stream Info */}
                  <td className="px-6 py-4 break-words">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-medium text-sm shadow-sm">
                          {getInitials(subject?.name || "")}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">
                          {subject?.name || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* NOtes count */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-900">
                      <Calendar className="w-3 h-3 mr-2 text-slate-400" />
                      {subject?.notesCount || "N/A"}
                    </div>
                  </td>

                  {/* pyq Count */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-900">
                      <BookOpen className="w-3 h-3 mr-2 text-slate-400" />
                      {subject?.pyqsCount || 0}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onExplore?.(subject?.id)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="Explore Stream"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(subject)}
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
                            onClick={() => onExplore?.(subject?.id)}
                            className="cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Explore Stream
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => onEdit?.(subject)}
                            className="cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Stream
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDelete?.(subject?.id)}
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
        {data?.map((subject, idx) => (
          <div
            key={`${subject?.id}-${idx}`}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-slate-200/50 border border-white/60"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-medium text-sm shadow-sm">
                    {getInitials(subject?.name || "")}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {subject?.name || "N/A"}
                  </div>
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
                    onClick={() => onExplore?.(subject?.id)}
                    className="cursor-pointer"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Explore
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => onEdit?.(subject?.id)}
                    className="cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete?.(subject?.id)}
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
                Total Notes: {subject?.notesCount || "N/A"}
              </div>

              <div className="flex items-center text-sm text-slate-600">
                <BookOpen className="w-3 h-3 mr-2 text-slate-400" />
                Total PYQs: {subject?.pyqsCount || 0}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-3 pt-3 border-t border-slate-200/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExplore?.(subject?.id)}
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
