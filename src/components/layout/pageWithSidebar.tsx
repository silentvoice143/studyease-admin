import React from "react";
import Sidebar from "./sidebar";

function PageWithSidebar({ children }) {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 relative">
        <div className="w-full h-20 ">header</div>
        <div className="flex-1 overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
}

export default PageWithSidebar;
