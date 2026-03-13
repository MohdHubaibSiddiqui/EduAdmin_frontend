import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const adminRegister = (data) => API.post("/admin/register", data);
export const adminLogin = (data) => API.post("/admin/login", data);
export const teacherLogin = (data) => API.post("/teachers/login", data);

// Departments
export const getDepartments = () => API.get("/departments");
export const getDepartment = (id) => API.get(`/departments/${id}`);
export const createDepartment = (data) => API.post("/departments", data);
export const updateDepartment = (id, data) => API.put(`/departments/${id}`, data);
export const deleteDepartment = (id) => API.delete(`/departments/${id}`);

// Classes
export const getClasses = () => API.get("/classes");
export const getClass = (id) => API.get(`/classes/${id}`);
export const createClass = (data) => API.post("/classes", data);
export const updateClass = (id, data) => API.put(`/classes/${id}`, data);
export const deleteClass = (id) => API.delete(`/classes/${id}`);

// Courses
export const getCourses = () => API.get("/courses");
export const getCourse = (id) => API.get(`/courses/${id}`);
export const createCourse = (data) => API.post("/courses", data);
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

// Teachers
export const getTeachers = () => API.get("/teachers");
export const getTeacher = (id) => API.get(`/teachers/${id}`);
export const createTeacher = (data) => API.post("/teachers", data);
export const updateTeacher = (id, data) => API.put(`/teachers/${id}`, data);
export const deleteTeacher = (id) => API.delete(`/teachers/${id}`);

// Students
export const getStudents = () => API.get("/students");
export const getStudent = (id) => API.get(`/students/${id}`);
export const createStudent = (data) => API.post("/students/add-student", data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Attendance
export const takeAttendance = (data) => API.post("/attendance/take-attendance", data);
export const getAttendance = () => API.get("/attendance/all");

export default API;
