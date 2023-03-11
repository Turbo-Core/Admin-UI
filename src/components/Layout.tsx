import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import { useState } from "react";

export default function Layout() {
  const [currentPage, setCurrentPage] = useState("DASHBOARD");
  return (
    <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === "DASHBOARD" && <Dashboard />}
    </Sidebar>
  );
}
