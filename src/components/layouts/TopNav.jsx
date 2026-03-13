import { Bell, User } from "lucide-react";

const TopNav = ({ title }) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6" style={{ boxShadow: "var(--shadow-sm)" }}>
      <h1 className="text-lg font-display font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
