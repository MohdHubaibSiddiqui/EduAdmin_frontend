// import { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
// import DataTable from "../../components/DataTable";
// import FormModal from "../../components/FormModal";
// import { getClasses, createClass, updateClass, deleteClass, getDepartments, getTeachers } from "../../services/api";

// const AdminClasses = () => {
//   const [data, setData] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({ name: "", department: "", teacher: "" });

//   const fetchData = async () => {
//     try {
//       const [cls, depts, tchs] = await Promise.all([getClasses(), getDepartments(), getTeachers()]);
//       setData(cls.data);
//       setDepartments(depts.data);
//       setTeachers(tchs.data);
//     } catch (err) { console.log(err); }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) { await updateClass(editing._id, form); }
//       else { await createClass(form); }
//       setModalOpen(false); setEditing(null); setForm({ name: "", department: "", teacher: "" }); fetchData();
//     } catch (err) { console.log(err); }
//   };

//   const handleEdit = (row) => {
//     setEditing(row);
//     setForm({ name: row.name, department: row.department?._id || row.department || "", teacher: row.teacher?._id || row.teacher || "" });
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this class?")) { try { await deleteClass(id); fetchData(); } catch (err) { console.log(err); } }
//   };

//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "department", label: "Department", render: (val) => val?.name || val || "—" },
//     { key: "teacher", label: "Teacher", render: (val) => val?.name || val || "—" },
//   ];

//   return (
//     <div className="animate-fade-in">
//       <div className="flex items-center justify-between mb-6">
//         <div className="page-header mb-0"><h1>Classes</h1><p>Manage college classes</p></div>
//         <button onClick={() => { setEditing(null); setForm({ name: "", department: "", teacher: "" }); setModalOpen(true); }}
//           className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
//           <Plus className="w-4 h-4" /> Add Class
//         </button>
//       </div>
//       <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
//       <FormModal title={editing ? "Edit Class" : "Add Class"} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
//             <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
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
//             <label className="block text-sm font-medium text-foreground mb-1.5">Teacher</label>
//             <select value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })}
//               className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
//               <option value="">Select Teacher</option>
//               {teachers.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
//             </select>
//           </div>
//           <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
//             {editing ? "Update" : "Create"}
//           </button>
//         </form>
//       </FormModal>
//     </div>
//   );
// };

// export default AdminClasses;
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { getClasses, createClass, updateClass, deleteClass, getDepartments, getTeachers } from "../../services/api";

const AdminClasses = () => {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    department: "",
    teacher: ""
  });

  // Fetch all data
  const fetchData = async () => {
    try {
      const [cls, depts, tchs] = await Promise.all([
        getClasses(),
        getDepartments(),
        getTeachers()
      ]);

      setData(cls.data.data || cls.data.data);
      setDepartments(depts.data.data || cls.data.data);
      setTeachers(tchs.data.data || cls.data.data);
      console.log(cls.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        departmentId: form.department,
        teacherId: form.teacher
      };

      if (editing) {
        await updateClass(editing._id, payload);
      } else {
        await createClass(payload);
      }

      setModalOpen(false);
      setEditing(null);
      setForm({ name: "", department: "", teacher: "" });

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // Edit
  const handleEdit = (row) => {
    setEditing(row);

    setForm({
      name: row.name,
      department: row.departmentId?._id || "",
      teacher: row.teacherId?._id || ""
    });

    setModalOpen(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this class?")) {
      try {
        await deleteClass(id);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Table columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "departmentId", label: "Department", render: (val) => val?.name || "—" },
    { key: "teacherId", label: "Teacher", render: (val) => val?.name || "—" },
  ];

  return (
    <div className="animate-fade-in">

      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1>Classes</h1>
          <p>Manage college classes</p>
        </div>

        <button
          onClick={() => {
            setEditing(null);
            setForm({ name: "", department: "", teacher: "" });
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Class
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={editing ? "Edit Class" : "Add Class"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border"
            />
          </div>

          <div>
            <label>Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border"
            >
              <option value="">Select Department</option>

              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Teacher</label>
            <select
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border"
            >
              <option value="">Select Teacher</option>

              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium"
          >
            {editing ? "Update" : "Create"}
          </button>

        </form>
      </FormModal>

    </div>
  );
};

export default AdminClasses;