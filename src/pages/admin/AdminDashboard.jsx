import { useState, useEffect } from "react";
import { Building2, School, BookOpen, UserCheck, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";
import { getDepartments, getClasses, getCourses, getTeachers, getStudents } from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ departments: 0, classes: 0, courses: 0, teachers: 0, students: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [depts, cls, crs, tchs, stds] = await Promise.all([
          getDepartments(), getClasses(), getCourses(), getTeachers(), getStudents()
        ]);
        setStats({
          departments: depts.data.data?.length || 0,
          classes: cls.data.data?.length || 0,
          courses: crs.data.data?.length || 0,
          teachers: tchs.data.data?.length || 0,
          students: stds.data.data?.length || 0,
        });
      } catch (err) {
        console.log("Stats fetch error:", err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { icon: Building2, label: "Departments", value: stats.departments, color: "primary", to: "/admin/departments" },
    { icon: School, label: "Classes", value: stats.classes, color: "info", to: "/admin/classes" },
    { icon: BookOpen, label: "Courses", value: stats.courses, color: "success", to: "/admin/courses" },
    { icon: UserCheck, label: "Teachers", value: stats.teachers, color: "warning", to: "/admin/teachers" },
    { icon: Users, label: "Students", value: stats.students, color: "secondary", to: "/admin/students" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening in your college.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => (
          <Link key={card.label} to={card.to}>
            <StatCard icon={card.icon} label={card.label} value={card.value} color={card.color} />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="form-card">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            {cards.map((card) => (
              <Link
                key={card.label}
                to={card.to}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <card.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Manage {card.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="form-card">
          <h3 className="font-display font-semibold text-foreground mb-4">System Info</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total Departments</span>
              <span className="font-semibold text-foreground">{stats.departments}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total Classes</span>
              <span className="font-semibold text-foreground">{stats.classes}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total Courses</span>
              <span className="font-semibold text-foreground">{stats.courses}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total Teachers</span>
              <span className="font-semibold text-foreground">{stats.teachers}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Total Students</span>
              <span className="font-semibold text-foreground">{stats.students}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
