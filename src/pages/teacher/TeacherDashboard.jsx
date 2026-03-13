import { Building2, School, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";

const TeacherDashboard = () => {
  const cards = [
    { icon: Building2, label: "My Departments", value: "View", color: "primary", to: "/teacher/departments" },
    { icon: School, label: "My Classes", value: "View", color: "info", to: "/teacher/classes" },
    { icon: ClipboardCheck, label: "Attendance", value: "Take", color: "success", to: "/teacher/attendance" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Teacher Dashboard</h1>
        <p>Welcome! Manage your classes and attendance.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link key={card.label} to={card.to}>
            <StatCard icon={card.icon} label={card.label} value={card.value} color={card.color} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
