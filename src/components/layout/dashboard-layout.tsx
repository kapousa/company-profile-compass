
import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { currentUser, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-medium">Loading...</h3>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          {children}
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
          Company Profile Management System &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
