// import { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
// import DataTable from "../../components/DataTable";
// import FormModal from "../../components/FormModal";
// import { getCourses, createCourse, updateCourse, deleteCourse, getDepartments } from "../../services/api";

// const AdminCourses = () => {
//   const [data, setData] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({ name: "", code: "", department: "", credits: "" });

//   // const fetchData = async () => {
//   //   try {
//   //     const [crs, depts] = await Promise.all([getCourses(), getDepartments()]);
//   //     setData(crs.data);
//   //     setDepartments(depts.data);
//   //   } catch (err) { console.log(err); }
//   // };
//   const fetchData = async () => {
//   try {
//     const [crs, depts] = await Promise.all([
//       getCourses(),
//       getDepartments()
//     ]);

//     setData(crs.data.data || []);
//     setDepartments(depts.data.data || []);

//   } catch (err) {
//     console.log(err);
//   }
// };

//   useEffect(() => { fetchData(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) { await updateCourse(editing._id, form); }
//       else { await createCourse(form); }
//       setModalOpen(false); setEditing(null); setForm({ name: "", code: "", department: "", credits: "" }); fetchData();
//     } catch (err) { console.log(err); }
//   };

//   const handleEdit = (row) => {
//     setEditing(row);
//     setForm({ name: row.name, code: row.code || "", department: row.department?._id || row.department || "", credits: row.credits || "" });
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this course?")) { try { await deleteCourse(id); fetchData(); } catch (err) { console.log(err); } }
//   };

//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "code", label: "Code" },
//     { key: "department", label: "Department", render: (val) => val?.name || val || "—" },
//     { key: "credits", label: "Credits" },
//   ];

//   return (
//     <div className="animate-fade-in">
//       <div className="flex items-center justify-between mb-6">
//         <div className="page-header mb-0"><h1>Courses</h1><p>Manage college courses</p></div>
//         <button onClick={() => { setEditing(null); setForm({ name: "", code: "", department: "", credits: "" }); setModalOpen(true); }}
//           className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
//           <Plus className="w-4 h-4" /> Add Course
//         </button>
//       </div>
//       <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
//       <FormModal title={editing ? "Edit Course" : "Add Course"} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
//             <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-foreground mb-1.5">Code</label>
//             <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-foreground mb-1.5">Department</label>
//             <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
//               <option value="">Select Department</option>
//               {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-foreground mb-1.5">Credits</label>
//             <input type="number" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
//           </div>
//           <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
//             {editing ? "Update" : "Create"}
//           </button>
//         </form>
//       </FormModal>
//     </div>
//   );
// };

// export default AdminCourses;
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { getCourses, createCourse, updateCourse, deleteCourse, getClasses } from "../../services/api";

const AdminCourses = () => {
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", classId: "" });

  // Fetch courses and classes
  const fetchData = async () => {
    try {
      const [crs, cls] = await Promise.all([getCourses(), getClasses()]);
      setData(crs.data.data || []);
      setClasses(cls.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateCourse(editing._id, form);
      } else {
        await createCourse(form);
      }
      setModalOpen(false);
      setEditing(null);
      setForm({ name: "", description: "", classId: "" });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // Handle edit button
  const handleEdit = (row) => {
    setEditing(row);
    setForm({
      name: row.name || "",
      description: row.description || "",
      classId: row.classId?._id || row.classId || ""
    });
    setModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      try {
        await deleteCourse(id);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "classId", label: "Class", render: (val) => {
        // Find the class object by ID
        const cls = classes.find(c => c._id === (val?._id || val));
        console.log("classId val:", val, "=> class name:", cls?.name);
        return cls?.name || "-";
      }},
  ];

  console.log("columns1========"+ JSON.stringify(columns));
  console.log("data1========"+JSON.stringify(data));

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1>Courses</h1>
          <p>Manage college courses</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ name: "", description: "", classId: "" });
            setModalOpen(true);
            console.log("columns2========"+columns);
            console.log("data2========"+data);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
          
      <FormModal
        title={editing ? "Edit Course" : "Add Course"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Class</label>
            <select
              value={form.classId}
              onChange={(e) => setForm({ ...form, classId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </FormModal>
    </div>
  );
};

export default AdminCourses;