import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  School,
  ClipboardCheck,
  LogOut,
  GraduationCap,
} from "lucide-react";

const links = [
  { to: "/teacher/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/teacher/departments", label: "Departments", icon: Building2 },
  { to: "/teacher/classes", label: "Classes", icon: School },
  { to: "/teacher/attendance", label: "Attendance", icon: ClipboardCheck },
];

const TeacherSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/teacher/login");
  };

  return (
    <aside className="w-64 min-h-screen flex flex-col" style={{ background: "hsl(var(--sidebar-bg))" }}>
      <div className="p-6 border-b" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--sidebar-active))" }}>
            <GraduationCap className="w-6 h-6" style={{ color: "hsl(var(--secondary-foreground))" }} />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg" style={{ color: "hsl(var(--sidebar-fg))" }}>EduAdmin</h2>
            <p className="text-xs" style={{ color: "hsl(var(--sidebar-fg) / 0.6)" }}>Teacher Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <button onClick={handleLogout} className="sidebar-link w-full hover:text-destructive">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
