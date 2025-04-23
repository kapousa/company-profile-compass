
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/login-form";

const Login = () => {
  const { currentUser } = useAuth();
  
  // Redirect if already authenticated
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Company Profile Management System</h1>
          <p className="text-gray-600">Sign in to access the admin portal</p>
        </div>
        
        <LoginForm />
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials: admin@cpms.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
