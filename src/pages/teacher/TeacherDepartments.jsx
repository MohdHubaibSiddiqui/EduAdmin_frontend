import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { getDepartments } from "../../services/api";

const TeacherDepartments = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await getDepartments(); setData(res.data.data); } catch (err) { console.log(err); }
    };
    fetch();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header"><h1>Departments</h1><p>View assigned departments</p></div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TeacherDepartments;
