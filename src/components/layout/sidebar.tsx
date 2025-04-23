
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Navigation items
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Companies", path: "/companies" },
    { name: "Add Company", path: "/companies/add" },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-slate-800 text-white flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && <h1 className="font-bold text-xl">CPMS</h1>}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-slate-700"
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={cn(
                  "flex items-center px-4 py-2 text-sm hover:bg-slate-700 transition-colors",
                  location.pathname === item.path && "bg-slate-700 border-l-4 border-blue-500"
                )}
              >
                {!collapsed && item.name}
                {collapsed && item.name.charAt(0)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        {!collapsed && (
          <div className="text-sm mb-2">
            <div>{currentUser?.name}</div>
            <div className="text-slate-400 text-xs">{currentUser?.email}</div>
          </div>
        )}
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={logout}
          className={collapsed ? "w-full px-0" : ""}
        >
          {collapsed ? "L" : "Logout"}
        </Button>
      </div>
    </div>
  );
}
