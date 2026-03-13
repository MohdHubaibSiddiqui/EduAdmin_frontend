// import { useState, useEffect } from "react";
// import { getClasses, getStudents, takeAttendance } from "../../services/api";
// import { CheckCircle, XCircle } from "lucide-react";

// const TeacherAttendance = () => {
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [attendance, setAttendance] = useState({});
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const [cls, stds] = await Promise.all([getClasses(), getStudents()]);
//         setClasses(cls.data.data);
//         setStudents(stds.data.data);
//       } catch (err) { console.log(err); }
//     };
//     fetch();
//   }, []);

//   // const filteredStudents = selectedClass
//   //   ? students.filter((s) => (s.studentClass?._id || s.studentClass) === selectedClass)
//   //   : [];

// const filteredStudents = selectedClass
//   ? students.filter((s) => s.studentClass === selectedClass)
//   : [];
    
//   const toggleAttendance = (studentId) => {
//     setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
//   };

//   const handleSubmit = async () => {
//     const records = filteredStudents.map((s) => ({
//       student: s._id,
//       status: attendance[s._id] ? "present" : "absent",
//     }));

//     try {
//       await takeAttendance({ classId: selectedClass, date, records });
//       setMessage("Attendance submitted successfully!");
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       setMessage("Failed to submit attendance");
//     }
//   };

//   return (
//     <div className="animate-fade-in">
//       <div className="page-header"><h1>Take Attendance</h1><p>Mark student attendance for your class</p></div>

//       <div className="form-card mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-foreground mb-1.5">Select Class</label>
//             <select value={selectedClass} onChange={(e) => { setSelectedClass(e.target.value); setAttendance({}); }}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
//               <option value="">Select a class</option>
//               {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-foreground mb-1.5">Date</label>
//             <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
//           </div>
//         </div>
//       </div>

//       {message && (
//         <div className="mb-4 p-3 rounded-lg bg-success/10 text-success text-sm font-medium">{message}</div>
//       )}

//       {filteredStudents.length > 0 ? (
//         <div className="form-card">
//           <div className="space-y-3">
//             {filteredStudents.map((student) => (
//               <div key={student._id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
//                 <div>
//                   <p className="font-medium text-foreground">{student.name}</p>
//                   <p className="text-sm text-muted-foreground">Roll: {student.rollNumber || "N/A"}</p>
//                 </div>
//                 <button onClick={() => toggleAttendance(student._id)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
//                     attendance[student._id]
//                       ? "bg-success text-success-foreground"
//                       : "bg-destructive/10 text-destructive"
//                   }`}>
//                   {attendance[student._id] ? <><CheckCircle className="w-4 h-4" /> Present</> : <><XCircle className="w-4 h-4" /> Absent</>}
//                 </button>
//               </div>
//             ))}
//           </div>
//           <button onClick={handleSubmit}
//             className="mt-6 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
//             Submit Attendance
//           </button>
//         </div>
//       ) : selectedClass ? (
//         <div className="form-card text-center py-8 text-muted-foreground">No students found in this class</div>
//       ) : null}
//     </div>
//   );
// };

// export default TeacherAttendance;


import { useState, useEffect } from "react";
import { getClasses, getStudents, takeAttendance } from "../../services/api";
import axios from "axios"; // For fetching all attendance
import { CheckCircle, XCircle } from "lucide-react";

const TeacherAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");

  // For viewing attendance
  const [allAttendance, setAllAttendance] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [showRecords, setShowRecords] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [cls, stds] = await Promise.all([getClasses(), getStudents()]);
        setClasses(cls.data.data);
        setStudents(stds.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const filteredStudents = selectedClass
    ? students.filter((s) => s.studentClass === selectedClass)
    : [];

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  const handleSubmit = async () => {
    const records = filteredStudents.map((s) => ({
      student: s._id,
      status: attendance[s._id] ? "Present" : "Absent", // Match enum in backend
    }));

    try {
      await takeAttendance({ classId: selectedClass, date, records });
      setMessage("Attendance submitted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log(err);
      setMessage("Failed to submit attendance");
    }
  };

  // Fetch all attendance
  const fetchAllAttendance = async () => {
    try {
      const res = await axios.get("/api/attendance/all"); // Your backend endpoint
      setAllAttendance(res.data.data);
      setShowRecords(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Filtered attendance by date
  const filteredAttendance = filterDate
    ? allAttendance.filter((rec) => rec.date.split("T")[0] === filterDate)
    : allAttendance;

  return (
    <div className="animate-fade-in">
      {/* Take Attendance Section */}
      <div className="page-header mb-6">
        <h1>Take Attendance</h1>
        <p>Mark student attendance for your class</p>
      </div>

      <div className="form-card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => { setSelectedClass(e.target.value); setAttendance({}); }}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a class</option>
              {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-success/10 text-success text-sm font-medium">{message}</div>
      )}

      {filteredStudents.length > 0 && (
        <div className="form-card mb-6">
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div key={student._id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">Roll: {student.rollNumber || "N/A"}</p>
                </div>
                <button
                  onClick={() => toggleAttendance(student._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    attendance[student._id]
                      ? "bg-success text-success-foreground"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {attendance[student._id] ? <><CheckCircle className="w-4 h-4" /> Present</> : <><XCircle className="w-4 h-4" /> Absent</>}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Submit Attendance
          </button>
        </div>
      )}

      {/* View Attendance Section */}
      <div className="page-header mt-10 mb-4">
        <h1>View Attendance</h1>
        <p>Check past attendance records</p>
      </div>

      <div className="form-card mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Filter by Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              onClick={fetchAllAttendance}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Show Attendance
            </button>
          </div>
        </div>
      </div>

      {showRecords && (
        <div className="form-card">
          <table className="w-full text-left border-collapse border border-border">
            <thead>
              <tr className="bg-muted/20">
                <th className="p-2 border border-border">Student Name</th>
                <th className="p-2 border border-border">Roll Number</th>
                <th className="p-2 border border-border">Class</th>
                <th className="p-2 border border-border">Status</th>
                <th className="p-2 border border-border">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? filteredAttendance.map((rec) => (
                <tr key={rec._id}>
                  <td className="p-2 border border-border">{rec.student?.name}</td>
                  <td className="p-2 border border-border">{rec.student?.rollNumber}</td>
                  <td className="p-2 border border-border">{rec.classId?.name}</td>
                  <td className="p-2 border border-border">{rec.status}</td>
                  <td className="p-2 border border-border">{new Date(rec.date).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-2 text-center text-muted-foreground">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;