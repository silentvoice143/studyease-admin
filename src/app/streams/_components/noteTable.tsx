"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TablePagination } from "@/components/layout/tablePagination";
import { Eye, Trash2, Download, FileText } from "lucide-react";

interface Note {
  id: number;
  title: string;
  year: number;
  fileUrl: string;
  subject: {
    id: number;
    name: string;
    semester: number;
    stream: any;
  };
}

interface NotesTableProps {
  data: Note[];
  currentPage?: number;
  itemsPerPage?: number;
  totalPages?: number;
  totalCount?: number;

  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (limit: number) => void;

  onDelete: (id: number) => void;
}

export const NotesTable: React.FC<NotesTableProps> = ({
  data,
  currentPage = 1,
  itemsPerPage = 10,
  totalPages = 1,
  totalCount = 0,
  onPageChange,
  onItemsPerPageChange,
  onDelete,
}) => {
  const handleLimitChange = (val: string) => {
    const limit = Number(val);
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white/50 divide-y divide-slate-200/60">
              {data?.map((note) => (
                <tr
                  key={note.id}
                  className="hover:bg-slate-50/80 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm">{note.title}</td>
                  <td className="px-6 py-4 text-sm">{note.year}</td>
                  <td className="px-6 py-4 text-sm">{note.subject.name}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end items-center gap-2">
                      {/* Preview */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(note.fileUrl, "_blank")}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {/* Download */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(note.fileUrl)}
                        className="text-emerald-600 hover:bg-emerald-50"
                      >
                        <Download className="w-4 h-4" />
                      </Button>

                      {/* More */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 hover:bg-slate-100"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => window.open(note.fileUrl, "_blank")}
                            className="cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View File
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => onDelete(note.id)}
                            className="cursor-pointer !text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Note
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
      <div className="md:hidden space-y-4 px-3">
        {data?.map((note) => (
          <div
            key={note.id}
            className="bg-white/70 rounded-xl p-4 shadow border border-white"
          >
            <div className="font-semibold text-slate-900">{note.title}</div>

            <div className="text-sm mt-1 text-slate-600">Year: {note.year}</div>
            <div className="text-sm text-slate-600">
              Subject: {note.subject.name}
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(note.fileUrl, "_blank")}
              >
                <Eye className="w-4 h-4 mr-2" /> View
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => onDelete(note.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </div>
          </div>
        ))}

        <div className="rounded-xl shadow bg-white/70">
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
