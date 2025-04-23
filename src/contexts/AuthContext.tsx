
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_USER: User = {
  id: '1',
  email: 'admin@cpms.com',
  name: 'Admin User',
  role: 'admin'
};
const DEMO_PASSWORD = 'admin123';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from local storage)
    const storedUser = localStorage.getItem('cpms_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('cpms_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // For demo purposes, simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials against demo credentials
      if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
        setCurrentUser(DEMO_USER);
        localStorage.setItem('cpms_user', JSON.stringify(DEMO_USER));
        toast.success('Login successful!');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cpms_user');
    toast.info('You have been logged out');
  };

  const value = {
    currentUser,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
