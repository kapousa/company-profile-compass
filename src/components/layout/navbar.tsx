
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navbar() {
  const { currentUser, logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-xl font-bold text-blue-600">CPMS</Link>
          
          {currentUser && (
            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/companies" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Companies
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <span className="text-sm text-gray-600">{currentUser.email}</span>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
