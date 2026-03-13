import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout";
import TeacherLayout from "./components/layouts/TeacherLayout";

import PublicHome from "./pages/public/PublicHome";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDepartments from "./pages/admin/AdminDepartments";
import AdminClasses from "./pages/admin/AdminClasses";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminStudents from "./pages/admin/AdminStudents";

import TeacherLogin from "./pages/teacher/TeacherLogin";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherDepartments from "./pages/teacher/TeacherDepartments";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";

import NotFound from "./pages/NotFound";
import "./index.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicHome />} />

      {/* Admin Auth */}
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="students" element={<AdminStudents />} />
      </Route>

      {/* Teacher Auth */}
      <Route path="/teacher/login" element={<TeacherLogin />} />

      {/* Teacher Protected */}
      <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="departments" element={<TeacherDepartments />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="attendance" element={<TeacherAttendance />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
