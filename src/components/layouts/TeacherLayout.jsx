import { Outlet } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import TopNav from "./TopNav";

const TeacherLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col">
        <TopNav title="Teacher Dashboard" />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
