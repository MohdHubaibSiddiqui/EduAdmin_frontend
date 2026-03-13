import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDepartments, getCourses, getTeachers } from "../../services/api";
import { GraduationCap, Building2, BookOpen, UserCheck, ArrowRight } from "lucide-react";

const PublicHome = () => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [depts, crs, tchs] = await Promise.all([getDepartments(), getCourses(), getTeachers()]);
        setDepartments(depts.data.data || []);
        setCourses(crs.data.data || []);
        setTeachers(tchs.data.data || []);
      } catch (err) { console.log(err); }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">EduAdmin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/login" className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Admin Login
            </Link>
            <Link to="/teacher/login" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Teacher Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            Welcome to<br />EduAdmin College
          </h1>
          <p className="text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
            Empowering education through excellence. Discover our departments, courses, and world-class faculty.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#departments" className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              Explore <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" /> Departments
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Our Departments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.length > 0 ? departments.map((dept) => (
              <div key={dept._id} className="stat-card">
                <Building2 className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-semibold text-lg text-foreground">{dept.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{dept.description || "Leading department in the college"}</p>
              </div>
            )) : (
              <p className="text-muted-foreground col-span-3 text-center py-8">No departments available yet</p>
            )}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" /> Courses
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Our Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? courses.map((course) => (
              <div key={course._id} className="stat-card">
                <BookOpen className="w-8 h-8 text-success mb-3" />
                <h3 className="font-display font-semibold text-lg text-foreground">{course.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Code: {course.code || "N/A"} | Credits: {course.credits || "N/A"}</p>
              </div>
            )) : (
              <p className="text-muted-foreground col-span-3 text-center py-8">No courses available yet</p>
            )}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
              <UserCheck className="w-4 h-4" /> Faculty
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Our Teachers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.length > 0 ? teachers.map((teacher) => (
              <div key={teacher._id} className="stat-card text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-display font-bold text-xl">
                    {teacher.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground">{teacher.name}</h3>
                <p className="text-sm text-muted-foreground">{teacher.department?.name || "Faculty"}</p>
              </div>
            )) : (
              <p className="text-muted-foreground col-span-4 text-center py-8">No teachers available yet</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-primary-foreground/60">© 2026 EduAdmin College. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;
