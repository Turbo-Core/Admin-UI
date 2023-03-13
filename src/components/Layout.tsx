import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import { useState } from "react";
import Settings from "@/components/Settings";
import Authentication from "@/components/Authentication";

export default function Layout({ logout } : { logout: () => void }) {
  const [currentPage, setCurrentPage] = useState("DASHBOARD");
  return (
    <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} logout={logout}>
      {currentPage === "DASHBOARD" && <Dashboard />}
      {currentPage === "SETTINGS" && <Settings />}
      {currentPage === "AUTHENTICATION" && <Authentication />}
    </Sidebar>
  );
}