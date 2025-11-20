import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

function PageWithSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 relative h-full overflow-auto">
        <Header />
        <div className="flex-1 overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
}

export default PageWithSidebar;
