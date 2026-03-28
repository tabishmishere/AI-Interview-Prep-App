import React from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fcfbfc]">
      <Navbar />
      <main className="pb-24 md:pb-16">{children}</main>
    </div>
  );
};

export default DashboardLayout;
