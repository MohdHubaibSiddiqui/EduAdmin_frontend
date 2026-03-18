// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getDepartments, getCourses, getTeachers } from "../../services/api";
// import { GraduationCap, Building2, BookOpen, UserCheck, ArrowRight } from "lucide-react";

// const PublicHome = () => {
//   const [departments, setDepartments] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const [depts, crs, tchs] = await Promise.all([getDepartments(), getCourses(), getTeachers()]);
//         setDepartments(depts.data.data || []);
//         setCourses(crs.data.data || []);
//         setTeachers(tchs.data.data || []);
//       } catch (err) { console.log(err); }
//     };
//     fetch();
//   }, []);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navbar */}
//       <nav className="bg-card border-b border-border sticky top-0 z-50" style={{ boxShadow: "var(--shadow-sm)" }}>
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
//               <GraduationCap className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <span className="font-display font-bold text-xl text-foreground">EduAdmin</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link to="/admin/login" className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
//               Admin Login
//             </Link>
//             <Link to="/teacher/login" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
//               Teacher Login
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section className="py-24 px-6" style={{ background: "var(--gradient-hero)" }}>
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
//             Welcome to<br />EduAdmin College
//           </h1>
//           <p className="text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
//             Empowering education through excellence. Discover our departments, courses, and world-class faculty.
//           </p>
//           <div className="flex items-center justify-center gap-4">
//             <a href="#departments" className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
//               Explore <ArrowRight className="w-4 h-4" />
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Departments */}
//       <section id="departments" className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
//               <Building2 className="w-4 h-4" /> Departments
//             </div>
//             <h2 className="text-3xl font-display font-bold text-foreground">Our Departments</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {departments.length > 0 ? departments.map((dept) => (
//               <div key={dept._id} className="stat-card">
//                 <Building2 className="w-8 h-8 text-primary mb-3" />
//                 <h3 className="font-display font-semibold text-lg text-foreground">{dept.name}</h3>
//                 <p className="text-sm text-muted-foreground mt-1">{dept.description || "Leading department in the college"}</p>
//               </div>
//             )) : (
//               <p className="text-muted-foreground col-span-3 text-center py-8">No departments available yet</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Courses */}
//       <section className="py-20 px-6 bg-muted/30">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
//               <BookOpen className="w-4 h-4" /> Courses
//             </div>
//             <h2 className="text-3xl font-display font-bold text-foreground">Our Courses</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.length > 0 ? courses.map((course) => (
//               <div key={course._id} className="stat-card">
//                 <BookOpen className="w-8 h-8 text-success mb-3" />
//                 <h3 className="font-display font-semibold text-lg text-foreground">{course.name}</h3>
//                 <p className="text-sm text-muted-foreground mt-1">Code: {course.code || "N/A"} | Credits: {course.credits || "N/A"}</p>
//               </div>
//             )) : (
//               <p className="text-muted-foreground col-span-3 text-center py-8">No courses available yet</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Teachers */}
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
//               <UserCheck className="w-4 h-4" /> Faculty
//             </div>
//             <h2 className="text-3xl font-display font-bold text-foreground">Our Teachers</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {teachers.length > 0 ? teachers.map((teacher) => (
//               <div key={teacher._id} className="stat-card text-center">
//                 <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-3">
//                   <span className="text-primary-foreground font-display font-bold text-xl">
//                     {teacher.name?.charAt(0)?.toUpperCase()}
//                   </span>
//                 </div>
//                 <h3 className="font-display font-semibold text-foreground">{teacher.name}</h3>
//                 <p className="text-sm text-muted-foreground">{teacher.department?.name || "Faculty"}</p>
//               </div>
//             )) : (
//               <p className="text-muted-foreground col-span-4 text-center py-8">No teachers available yet</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 px-6 bg-primary text-primary-foreground">
//         <div className="max-w-7xl mx-auto text-center">
//           <p className="text-sm text-primary-foreground/60">© 2026 EduAdmin College. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PublicHome;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getDepartments, getCourses, getTeachers } from "../../services/api";
// import { GraduationCap, Building2, BookOpen, UserCheck, ArrowRight } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import crousel1 from "../.././assets/crousel1.jpg";
// import crousel2 from "../.././assets/crousel2.jpg";
// import crousel3 from "../.././assets/crousel3.jpg";

// import "swiper/css";
// import "swiper/css/pagination";

// const PublicHome = () => {
//   const [departments, setDepartments] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const [depts, crs, tchs] = await Promise.all([getDepartments(), getCourses(), getTeachers()]);
//         setDepartments(depts.data.data || []);
//         setCourses(crs.data.data || []);
//         setTeachers(tchs.data.data || []);
//       } catch (err) { console.log(err); }
//     };
//     fetch();
//   }, []);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navbar */}
//       <nav className="bg-card border-b border-border sticky top-0 z-50" style={{ boxShadow: "var(--shadow-sm)" }}>
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
//               <GraduationCap className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <span className="font-display font-bold text-xl text-foreground">EduAdmin</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link to="/admin/login" className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
//               Admin Login
//             </Link>
//             <Link to="/teacher/login" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
//               Teacher Login
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero
//       <section className="py-24 px-6" style={{ background: "var(--gradient-hero)" }}>
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
//             Welcome to<br />EduAdmin College
//           </h1>
//           <p className="text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
//             Empowering education through excellence. Discover our departments, courses, and world-class faculty.
//           </p>
//           <div className="flex items-center justify-center gap-4">
//             <a href="#departments" className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
//               Explore <ArrowRight className="w-4 h-4" />
//             </a>
//           </div>
//         </div>
//       </section> */}
//      <section className="relative py-10 bg-gray-100">

//   <div className="flex items-center justify-center">

//     <Swiper
//       modules={[Autoplay, Pagination]}
//       autoplay={{ delay: 3000 }}
//       pagination={{ clickable: true }}
//       loop={true}
//       className="w-full max-w-4xl h-[70vh]"
//     >

//       {/* Slide 1 */}
//       <SwiperSlide className="flex items-center justify-center">
//         <div
//           className="h-full w-full rounded-2xl bg-cover bg-center flex items-center justify-center"
//           style={{ backgroundImage: `url(${crousel1})` }}
//         >
//           <div className="bg-black/60 p-8 rounded-xl text-center">
//             <h1 className="text-5xl font-bold text-white mb-4">
//               Welcome to EduAdmin College
//             </h1>
//             <p className="text-white/80">
//               Empowering education through excellence
//             </p>
//           </div>
//         </div>
//       </SwiperSlide>

//       {/* Slide 2 */}
//       <SwiperSlide className="flex items-center justify-center">
//         <div
//           className="h-full w-full rounded-2xl bg-cover bg-center flex items-center justify-center"
//           style={{ backgroundImage: `url(${crousel2})` }}
//         >
//           <div className="bg-black/60 p-8 rounded-xl text-center">
//             <h1 className="text-5xl font-bold text-white mb-4">
//               Modern Classrooms
//             </h1>
//             <p className="text-white/80">
//               Smart learning with advanced technology
//             </p>
//           </div>
//         </div>
//       </SwiperSlide>

//       {/* Slide 3 */}
//       <SwiperSlide className="flex items-center justify-center">
//         <div
//           className="h-full w-full rounded-2xl bg-cover bg-center flex items-center justify-center"
//           style={{ backgroundImage: `url(${crousel3})` }}
//         >
//           <div className="bg-black/60 p-8 rounded-xl text-center">
//             <h1 className="text-5xl font-bold text-white mb-4">
//               Expert Faculty
//             </h1>
//             <p className="text-white/80">
//               Learn from experienced teachers
//             </p>
//           </div>
//         </div>
//       </SwiperSlide>

//     </Swiper>

//   </div>

// </section>

//       {/* Departments */}
//       <section id="departments" className="py-12 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
//               <Building2 className="w-4 h-4" /> Departments
//             </div>
//             <h2 className="text-3xl font-display font-bold text-foreground">Academic Departments</h2>

// <p className="text-muted-foreground mt-2">
//   Explore diverse fields of study designed to prepare you for a successful career.
// </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {departments.length > 0 ? departments.map((dept) => (
//               <div key={dept._id} className="stat-card">
//                 <Building2 className="w-8 h-8 text-primary mb-3" />
//                 <h3 className="font-display font-semibold text-lg text-foreground">{dept.name}</h3>
//                 <p className="text-sm text-muted-foreground mt-1">{dept.description || "Leading department in the college"}</p>
//               </div>
//             )) : (
//               <p className="text-muted-foreground col-span-3 text-center py-8">No departments available yet</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Courses */}
//       <section className="py-12 px-6 bg-muted/30">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
//               <BookOpen className="w-4 h-4" /> Courses
//             </div>
//             <h2 className="text-3xl font-display font-bold text-foreground">Academic Courses</h2>
//             <p className="text-muted-foreground mt-2">
//   Industry-relevant courses crafted to build practical skills and knowledge.
// </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.length > 0 ? courses.map((course) => (
//               <div key={course._id} className="stat-card">
//                 <BookOpen className="w-8 h-8 text-success mb-3" />
//                 <h3 className="font-display font-semibold text-lg text-foreground">{course.name}</h3>
//                 <p className="text-sm text-muted-foreground mt-1">Details: {course.details || "N/A"} </p>
//               </div>
//             )) : (
//               <p className="text-muted-foreground col-span-3 text-center py-8">No courses available yet</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Teachers */}
//       <section className="py-12 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
//               <UserCheck className="w-4 h-4" /> Faculty
//             </div>
//             <h2 className="text-3xl font-display font-bold text-foreground">Meet Our Faculty</h2>
//             <p className="text-muted-foreground mt-2">
//               Learn from experienced educators and industry professionals dedicated to your success.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {teachers.length > 0 ? teachers.map((teacher) => (
//               <div key={teacher._id} className="stat-card text-center">
//                 <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-3">
//                   <span className="text-primary-foreground font-display font-bold text-xl">
//                     {teacher.name?.charAt(0)?.toUpperCase()}
//                   </span>
//                 </div>
//                 <h3 className="font-display font-semibold text-foreground">{teacher.name}</h3>
//                 <p className="text-sm text-muted-foreground">{teacher.department?.name || "Faculty"}</p>
//               </div>
//             )) : (
//               <p className="text-muted-foreground col-span-4 text-center py-8">No teachers available yet</p>
//             )}
//           </div>
//         </div>
//       </section>

// {/* Facilities */}
// <section className="py-14 px-6 bg-muted/30">
//   <div className="max-w-7xl mx-auto text-center">
//     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
//               <Building2 className="w-4 h-4" /> Facilities
//             </div>
//     <h2 className="text-3xl font-bold">
//   Campus Facilities
// </h2>

// <p className="text-muted-foreground mt-2">
//   Experience a modern campus equipped with world-class infrastructure and resources.
// </p>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

//       {/* Library */}
//       <div className="stat-card overflow-hidden p-0 group cursor-pointer">
//         <img
//           src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
//           alt="Library"
//           className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
//         />
//         <div className="p-5 text-left">
//           <h3 className="font-semibold text-lg text-foreground">Library</h3>
//           <p className="text-sm text-muted-foreground mt-2">
//             Thousands of books and digital resources available.
//           </p>
//         </div>
//       </div>

//       {/* Computer Lab */}
//       <div className="stat-card overflow-hidden p-0 group cursor-pointer">
//         <img
//           src="https://media.istockphoto.com/id/1401759183/photo/computer-lab-at-school-computers-on-table.jpg?s=612x612&w=0&k=20&c=KRGYHJmKxC7ggtHortUV_09-UMLq7rTnlJHxECPS49k="
//           alt="Computer Lab"
//           className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
//         />
//         <div className="p-5 text-left">
//           <h3 className="font-semibold text-lg text-foreground">Computer Labs</h3>
//           <p className="text-sm text-muted-foreground mt-2">
//             Modern labs with high-speed internet.
//           </p>
//         </div>
//       </div>

//       {/* Sports */}
//       <div className="stat-card overflow-hidden p-0 group cursor-pointer">
//         <img
//           src="https://media.istockphoto.com/id/1154162028/photo/boy-soccer-player-in-training-boys-running-between-cones-amd-jumping-during-practice-in-field.jpg?s=612x612&w=0&k=20&c=wcEV26LPDYpeg0EUxhXSxsDiNQ7uO0o2NNajxLXo64E="
//           alt="Sports"
//           className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
//         />
//         <div className="p-5 text-left">
//           <h3 className="font-semibold text-lg text-foreground">Sports</h3>
//           <p className="text-sm text-muted-foreground mt-2">
//             Indoor & outdoor sports facilities.
//           </p>
//         </div>
//       </div>

//     </div>
//   </div>
// </section>

//       {/* Footer */}
//       {/* <footer className="py-8 px-6 bg-primary text-primary-foreground">
//         <div className="max-w-7xl mx-auto text-center">
//           <p className="text-sm text-primary-foreground/60">© 2026 EduAdmin College. All rights reserved.</p>
//         </div>
//       </footer> */}
//     <footer className="bg-primary text-primary-foreground py-10 px-6">
//   <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

//     {/* Logo */}
//     <div>
//       <h2 className="text-xl font-bold mb-3">EduAdmin</h2>
//       <p className="text-sm text-primary-foreground/70">
//         Empowering students with quality education.
//       </p>
//     </div>

//     {/* Quick Links */}
//     <div>
//       <h3 className="font-semibold mb-3">Quick Links</h3>
//       <ul className="space-y-2 text-sm">
//         <li><a href="#departments" className="hover:underline">Departments</a></li>
//         <li><a href="#" className="hover:underline">Courses</a></li>
//         <li><a href="#" className="hover:underline">Faculty</a></li>
//       </ul>
//     </div>

//     {/* Contact */}
//     <div>
//       <h3 className="font-semibold mb-3">Contact</h3>
//       <p className="text-sm">Email: admin@college.com</p>
//       <p className="text-sm">Phone: +91 9876543210</p>
//     </div>

//   </div>

//   <div className="text-center mt-8 text-sm text-primary-foreground/60">
//     © 2026 EduAdmin College. All rights reserved.
//   </div>
// </footer>
//     </div>
//   );
// };

// export default PublicHome;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDepartments, getCourses, getTeachers } from "../../services/api";
import { GraduationCap, Building2, BookOpen, UserCheck, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import crousel1 from "../.././assets/crousel1.jpg";
import crousel2 from "../.././assets/crousel2.jpg";
import crousel3 from "../.././assets/crousel3.jpg";

import "swiper/css";
import "swiper/css/pagination";

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
        {/* Changed to w-[90%] md:w-[80%] lg:w-[75%] for 10-15% side margins */}
        <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto h-16 flex items-center justify-between">
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
<section className="relative py-10 bg-gray-100">
  <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
    
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full h-[65vh] rounded-3xl overflow-hidden shadow-xl"
    >

      {/* Slide */}
      {[crousel1, crousel2, crousel3].map((img, i) => (
        <SwiperSlide key={i}>
          
          {/* Image */}
          <div
            className="relative h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          >

            {/* Gradient Overlay (VERY IMPORTANT) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center px-6 md:px-12">
              
              <div className="max-w-xl text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {i === 0 && "Welcome to EduAdmin College"}
                  {i === 1 && "Modern Classrooms"}
                  {i === 2 && "Expert Faculty"}
                </h1>

                <p className="text-white/80 text-sm md:text-lg mb-6">
                  {i === 0 && "Empowering education through excellence"}
                  {i === 1 && "Smart learning with advanced technology"}
                  {i === 2 && "Learn from experienced teachers"}
                </p>

                {/* Optional Button */}
                <button className="px-5 py-2 bg-white text-black rounded-lg font-medium hover:scale-105 transition">
                  Explore
                </button>
              </div>

            </div>

          </div>

        </SwiperSlide>
      ))}

    </Swiper>

  </div>
</section>
      {/* Departments */}
      <section id="departments" className="py-12">
        <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" /> Departments
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Academic Departments</h2>
            <p className="text-muted-foreground mt-2">
              Explore diverse fields of study designed to prepare you for a successful career.
            </p>
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
      <section className="py-12 bg-muted/30">
        <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" /> Courses
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Academic Courses</h2>
            <p className="text-muted-foreground mt-2">
              Industry-relevant courses crafted to build practical skills and knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? courses.map((course) => (
              <div key={course._id} className="stat-card">
                <BookOpen className="w-8 h-8 text-success mb-3" />
                <h3 className="font-display font-semibold text-lg text-foreground">{course.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Details: {course.description || "N/A"} </p>
              </div>
            )) : (
              <p className="text-muted-foreground col-span-3 text-center py-8">No courses available yet</p>
            )}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-12">
        <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
              <UserCheck className="w-4 h-4" /> Faculty
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Meet Our Faculty</h2>
            <p className="text-muted-foreground mt-2">
              Learn from experienced educators and industry professionals dedicated to your success.
            </p>
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

      {/* Facilities */}
      <section className="py-14 bg-muted/30">
        <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" /> Facilities
          </div>
          <h2 className="text-3xl font-bold">Campus Facilities</h2>
          <p className="text-muted-foreground mt-2">
            Experience a modern campus equipped with world-class infrastructure and resources.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {/* Library */}
            <div className="stat-card overflow-hidden p-0 group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
                alt="Library"
                className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-5 text-left">
                <h3 className="font-semibold text-lg text-foreground">Library</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Thousands of books and digital resources available.
                </p>
              </div>
            </div>

            {/* Computer Lab */}
            <div className="stat-card overflow-hidden p-0 group cursor-pointer">
              <img
                src="https://media.istockphoto.com/id/1401759183/photo/computer-lab-at-school-computers-on-table.jpg?s=612x612&w=0&k=20&c=KRGYHJmKxC7ggtHortUV_09-UMLq7rTnlJHxECPS49k="
                alt="Computer Lab"
                className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-5 text-left">
                <h3 className="font-semibold text-lg text-foreground">Computer Labs</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Modern labs with high-speed internet.
                </p>
              </div>
            </div>

            {/* Sports */}
            <div className="stat-card overflow-hidden p-0 group cursor-pointer">
              <img
                src="https://media.istockphoto.com/id/1154162028/photo/boy-soccer-player-in-training-boys-running-between-cones-amd-jumping-during-practice-in-field.jpg?s=612x612&w=0&k=20&c=wcEV26LPDYpeg0EUxhXSxsDiNQ7uO0o2NNajxLXo64E="
                alt="Sports"
                className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-5 text-left">
                <h3 className="font-semibold text-lg text-foreground">Sports</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Indoor & outdoor sports facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10">
        <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div>
            <h2 className="text-xl font-bold mb-3">EduAdmin</h2>
            <p className="text-sm text-primary-foreground/70">
              Empowering students with quality education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#departments" className="hover:underline">Departments</a></li>
              <li><a href="#" className="hover:underline">Courses</a></li>
              <li><a href="#" className="hover:underline">Faculty</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <p className="text-sm">Email: admin@college.com</p>
            <p className="text-sm">Phone: +91 9876543210</p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-primary-foreground/60">
          © 2026 EduAdmin College. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;