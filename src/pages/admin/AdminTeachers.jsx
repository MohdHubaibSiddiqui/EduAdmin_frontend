import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { getTeachers, createTeacher, updateTeacher, deleteTeacher, getDepartments } from "../../services/api";

const AdminTeachers = () => {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "" });

  const fetchData = async () => {
    try {
      const [tchs, depts] = await Promise.all([getTeachers(), getDepartments()]);
      setData(tchs.data.data);
      setDepartments(depts.data.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateTeacher(editing._id, form); }
      else { await createTeacher(form); }
      setModalOpen(false); setEditing(null); setForm({ name: "", email: "", password: "", department: "" }); fetchData();
    } catch (err) { console.log(err); }
  };

  const handleEdit = (row) => {
    setEditing(row);
    setForm({ name: row.name, email: row.email, password: "", department: row.department?._id || row.department || "" });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this teacher?")) { try { await deleteTeacher(id); fetchData(); } catch (err) { console.log(err); } }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department", render: (val) => val?.name || val || "—" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0"><h1>Teachers</h1><p>Manage college teachers</p></div>
        <button onClick={() => { setEditing(null); setForm({ name: "", email: "", password: "", department: "" }); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>
      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
      <FormModal title={editing ? "Edit Teacher" : "Add Teacher"} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          {!editing && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Department</label>
            <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select Department</option>
              {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
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

export default AdminTeachers;
