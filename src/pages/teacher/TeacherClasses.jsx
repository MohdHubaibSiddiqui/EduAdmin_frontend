import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { getClasses } from "../../services/api";

const TeacherClasses = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await getClasses(); setData(res.data.data); } catch (err) { console.log(err); }
    };
    fetch();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "department", label: "Department", render: (val) => val?.name || val || "—" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header"><h1>Classes</h1><p>View assigned classes</p></div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TeacherClasses;
