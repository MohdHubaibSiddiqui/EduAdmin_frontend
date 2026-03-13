import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { teacherLogin } from "../../services/api";
import { GraduationCap, LogIn } from "lucide-react";

const TeacherLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await teacherLogin(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "teacher");
      navigate("/teacher/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">Teacher Login</h1>
          <p className="text-muted-foreground mt-2">Sign in to your teacher dashboard</p>
        </div>
        <div className="form-card">
          {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="teacher@college.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />{loading ? "Signing in..." : "Login"}
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            <Link to="/" className="text-primary font-medium hover:underline">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
