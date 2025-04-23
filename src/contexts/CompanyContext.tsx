
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CompanyProfile } from '@/types';
import { MOCK_COMPANIES } from '@/data/mockData';
import { generateId } from '@/lib/utils';

interface CompanyContextType {
  companies: CompanyProfile[];
  loading: boolean;
  addCompany: (company: CompanyProfile) => Promise<string>;
  updateCompany: (id: string, company: CompanyProfile) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  getCompany: (id: string) => CompanyProfile | undefined;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load companies from localStorage or use mock data
    const loadCompanies = async () => {
      try {
        const storedCompanies = localStorage.getItem('cpms_companies');
        if (storedCompanies) {
          setCompanies(JSON.parse(storedCompanies));
        } else {
          // Use mock data for initial setup
          setCompanies(MOCK_COMPANIES);
          localStorage.setItem('cpms_companies', JSON.stringify(MOCK_COMPANIES));
        }
      } catch (error) {
        console.error('Error loading companies:', error);
        toast.error('Failed to load company data');
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const updateLocalStorage = (updatedCompanies: CompanyProfile[]) => {
    localStorage.setItem('cpms_companies', JSON.stringify(updatedCompanies));
  };

  const addCompany = async (company: CompanyProfile): Promise<string> => {
    try {
      // In a real app, this would be an API call
      const newCompany = {
        ...company,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedCompanies = [...companies, newCompany];
      setCompanies(updatedCompanies);
      updateLocalStorage(updatedCompanies);
      
      toast.success('Company added successfully');
      return newCompany.id as string;
    } catch (error) {
      console.error('Error adding company:', error);
      toast.error('Failed to add company');
      throw error;
    }
  };

  const updateCompany = async (id: string, company: CompanyProfile): Promise<void> => {
    try {
      // In a real app, this would be an API call
      const updatedCompany = {
        ...company,
        id,
        updatedAt: new Date().toISOString()
      };
      
      const updatedCompanies = companies.map(c => 
        c.id === id ? updatedCompany : c
      );
      
      setCompanies(updatedCompanies);
      updateLocalStorage(updatedCompanies);
      
      toast.success('Company updated successfully');
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Failed to update company');
      throw error;
    }
  };

  const deleteCompany = async (id: string): Promise<void> => {
    try {
      // In a real app, this would be an API call
      const updatedCompanies = companies.filter(c => c.id !== id);
      
      setCompanies(updatedCompanies);
      updateLocalStorage(updatedCompanies);
      
      toast.success('Company deleted successfully');
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Failed to delete company');
      throw error;
    }
  };

  const getCompany = (id: string): CompanyProfile | undefined => {
    return companies.find(company => company.id === id);
  };

  const value: CompanyContextType = {
    companies,
    loading,
    addCompany,
    updateCompany,
    deleteCompany,
    getCompany
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};
