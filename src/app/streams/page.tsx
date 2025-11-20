"use client";
import React, { useState } from "react";
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

function Streams() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(mockStreams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStreams = mockStreams.slice(startIndex, endIndex);

  const handleAddStream = () => {
    console.log("Add new stream");
    // Add your logic to open a modal or navigate to add stream page
  };

  const handleExplore = (streamId: number) => {
    console.log("Explore stream:", streamId);
    // Add your navigation logic here
  };

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
              onClick={handleAddStream}
              className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600"
            >
              <Plus className="h-4 w-4" />
              Add Stream
            </Button>
          </CardHeader>
          <CardContent>
            <StreamsTable />
          </CardContent>
        </Card>
      </div>
    </PageWithSidebar>
  );
}

export default Streams;
