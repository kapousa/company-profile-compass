
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CompanyProfile } from '@/types';
import { MOCK_COMPANIES } from '@/data/mockData';
import { toast } from 'sonner';

interface CompanyContextType {
  companies: CompanyProfile[];
  loading: boolean;
  error: string | null;
  getCompanyById: (id: string) => CompanyProfile | undefined;
  addCompany: (company: CompanyProfile) => void;
  updateCompany: (id: string, updatedCompany: CompanyProfile) => void;
  deleteCompany: (id: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load companies from localStorage or use mock data
    const loadCompanies = () => {
      try {
        const storedCompanies = localStorage.getItem('cpms_companies');
        if (storedCompanies) {
          setCompanies(JSON.parse(storedCompanies));
        } else {
          // Use mock data for initial load
          setCompanies(MOCK_COMPANIES as CompanyProfile[]);
          // Store mock data in localStorage for future use
          localStorage.setItem('cpms_companies', JSON.stringify(MOCK_COMPANIES));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading companies:', error);
        setError('Failed to load companies data');
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const getCompanyById = (id: string): CompanyProfile | undefined => {
    return companies.find(company => company.id === id);
  };

  const addCompany = (company: CompanyProfile) => {
    // Generate an ID if not provided
    const newCompany = {
      ...company,
      id: company.id || `${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedCompanies = [...companies, newCompany];
    setCompanies(updatedCompanies);
    localStorage.setItem('cpms_companies', JSON.stringify(updatedCompanies));
    toast.success('Company added successfully!');
  };

  const updateCompany = (id: string, updatedCompany: CompanyProfile) => {
    const companyIndex = companies.findIndex(company => company.id === id);
    
    if (companyIndex === -1) {
      toast.error('Company not found');
      return;
    }

    const newCompany = {
      ...updatedCompany,
      updatedAt: new Date().toISOString(),
    };

    const updatedCompanies = [...companies];
    updatedCompanies[companyIndex] = newCompany;
    
    setCompanies(updatedCompanies);
    localStorage.setItem('cpms_companies', JSON.stringify(updatedCompanies));
    toast.success('Company updated successfully!');
  };

  const deleteCompany = (id: string) => {
    const updatedCompanies = companies.filter(company => company.id !== id);
    setCompanies(updatedCompanies);
    localStorage.setItem('cpms_companies', JSON.stringify(updatedCompanies));
    toast.success('Company deleted successfully!');
  };

  const value = {
    companies,
    loading,
    error,
    getCompanyById,
    addCompany,
    updateCompany,
    deleteCompany,
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};

export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};
