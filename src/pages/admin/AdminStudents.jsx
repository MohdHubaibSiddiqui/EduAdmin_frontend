import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { getStudents, createStudent, updateStudent, deleteStudent, getClasses } from "../../services/api";

const AdminStudents = () => {
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", rollNumber: "", studentClass: "" });

  const fetchData = async () => {
    try {
      const [stds, cls] = await Promise.all([getStudents(), getClasses()]);
      setData(stds.data.data);
      setClasses(cls.data.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateStudent(editing._id, form); }
      else { await createStudent(form); }
      setModalOpen(false); setEditing(null); setForm({ name: "", rollNumber: "", studentClass: "" }); fetchData();
    } catch (err) { console.log(err); }
  };

  const handleEdit = (row) => {
    setEditing(row);
    setForm({ name: row.name || "", rollNumber: row.rollNumber || "", studentClass: row.studentClass?._id || row.studentClass || "" });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) { try { await deleteStudent(id); fetchData(); } catch (err) { console.log(err); } }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "year", label: "Year" },
    { key: "rollNo", label: "RollNo." },
    { key: "studentClass", label: "Class", render: (val) => {
        // Find the class object by ID
        const cls = classes.find(c => c._id === (val?._id || val));
        console.log("classId val:", val, "=> class name:", cls?.name);
        return cls?.name || "-";
      } },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0"><h1>Students</h1><p>Manage college students</p></div>
        <button onClick={() => { setEditing(null); setForm({ name: "", rollNumber: "", studentClass: "" }); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
      <FormModal title={editing ? "Edit Student" : "Add Student"} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Roll Number</label>
            <input type="text" value={form.rollNumber} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Class</label>
            <select value={form.studentClass} onChange={(e) => setForm({ ...form, studentClass: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select Class</option>
              {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </FormModal>
    </div>
  );
};

export default AdminStudents;

// import { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
// import DataTable from "../../components/DataTable";
// import FormModal from "../../components/FormModal";
// import { getStudents, createStudent, updateStudent, deleteStudent, getClasses, getDepartments } from "../../services/api";

// const AdminStudents = () => {
//   const [data, setData] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({ name: "", rollNumber: "", department: "", classId: "" });

//   // Fetch students, classes, and departments
//   const fetchData = async () => {
//     try {
//       const [stds, cls, depts] = await Promise.all([getStudents(), getClasses(), getDepartments()]);
//       setData(stds.data.data || []);
//       setClasses(cls.data.data || []);
//       setDepartments(depts.data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) {
//         await updateStudent(editing._id, form);
//       } else {
//         await createStudent(form);
//       }
//       setModalOpen(false);
//       setEditing(null);
//       setForm({ name: "", rollNumber: "", department: "", classId: "" });
//       fetchData();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Handle edit
//   const handleEdit = (row) => {
//     setEditing(row);
//     setForm({
//       name: row.name || "",
//       rollNumber: row.rollNumber || "",
//       department: row.department?._id || row.department || "",
//       classId: row.classId?._id || row.classId || ""
//     });
//     setModalOpen(true);
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this student?")) {
//       try {
//         await deleteStudent(id);
//         fetchData();
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   // Filter classes based on selected department
//   const filteredClasses = classes.filter(c => c.department?._id === form.department);

//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "rollNumber", label: "Roll No." },
//     { key: "department", label: "Department", render: val => val?.name || val || "—" },
//     { key: "classId", label: "Class", render: val => val?.name || val || "—" },
//   ];

//   return (
//     <div className="animate-fade-in">
//       <div className="flex items-center justify-between mb-6">
//         <div className="page-header mb-0">
//           <h1>Students</h1>
//           <p>Manage college students</p>
//         </div>
//         <button
//           onClick={() => {
//             setEditing(null);
//             setForm({ name: "", rollNumber: "", department: "", classId: "" });
//             setModalOpen(true);
//           }}
//           className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
//         >
//           <Plus className="w-4 h-4" /> Add Student
//         </button>
//       </div>

//       <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />

//       <FormModal
//   title={editing ? "Edit Student" : "Add Student"}
//   isOpen={modalOpen}
//   onClose={() => setModalOpen(false)}
// >
//   <form onSubmit={handleSubmit} className="space-y-4">
//     {/* Name Input */}
//     <div>
//       <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
//       <input
//         type="text"
//         required
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//       />
//     </div>

//     {/* Roll Number Input */}
//     <div>
//       <label className="block text-sm font-medium text-foreground mb-1.5">Roll Number</label>
//       <input
//         type="text"
//         value={form.rollNumber}
//         onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
//         className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//       />
//     </div>

//     {/* Department Dropdown */}
//     <div>
//       <label className="block text-sm font-medium text-foreground mb-1.5">Department</label>
//       <select
//         value={form.department}
//         onChange={(e) => setForm({ ...form, department: e.target.value, classId: "" })}
//         className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//       >
//         <option value="">Select Department</option>
//         {departments.map(d => (
//           <option key={d._id} value={d._id}>{d.name}</option>
//         ))}
//       </select>
//     </div>

//     {/* Class Dropdown (filtered by selected department) */}
//     <div>
//       <label className="block text-sm font-medium text-foreground mb-1.5">Class</label>
//       <select
//         value={form.classId}
//         onChange={(e) => setForm({ ...form, classId: e.target.value })}
//         className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
//       >
//         <option value="">Select Class</option>
//         {filteredClasses.length === 0 && <option disabled>No classes available</option>}
//         {filteredClasses.map(c => (
//           <option key={c._id} value={c._id}>{c.name}</option>
//         ))}
//       </select>
//     </div>

//     {/* Submit Button */}
//     <button
//       type="submit"
//       className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
//     >
//       {editing ? "Update" : "Create"}
//     </button>
//   </form>
// </FormModal>
//     </div>
//   );
// };

// export default AdminStudents;