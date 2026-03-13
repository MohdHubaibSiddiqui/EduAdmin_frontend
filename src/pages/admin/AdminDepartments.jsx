import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../../services/api";

const AdminDepartments = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchData = async () => {
    try {
      const res = await getDepartments();
      setData(res.data.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateDepartment(editing._id, form);
      } else {
        await createDepartment(form);
      }
      setModalOpen(false);
      setEditing(null);
      setForm({ name: "", description: "" });
      fetchData();
    } catch (err) { console.log(err); }
  };

  const handleEdit = (row) => {
    setEditing(row);
    setForm({ name: row.name, description: row.description || "" });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id);
        fetchData();
      } catch (err) { console.log(err); }
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="page-header mb-0">
          <h1>Departments</h1>
          <p>Manage college departments</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ name: "", description: "" }); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />

      <FormModal title={editing ? "Edit Department" : "Add Department"} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" rows={3} />
          </div>
          <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </FormModal>
    </div>
  );
};

export default AdminDepartments;
