import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import TopNav from "./TopNav";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <TopNav title="Admin Dashboard" />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
