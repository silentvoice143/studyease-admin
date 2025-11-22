"use client";
import PageWithSidebar from "@/components/layout/pageWithSidebar";
import { useParams } from "next/navigation";
import React from "react";

function Stream() {
  const params = useParams();
  return (
    <PageWithSidebar>
      <div>Stream {params.id}</div>
    </PageWithSidebar>
  );
}

export default Stream;
