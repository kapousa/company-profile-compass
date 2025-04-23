
// Company Profile Types
export type CompanySize = 'Small' | 'Medium' | 'Large' | 'Enterprise';
export type ActionType = 'Contact Us' | 'Apply' | 'Purchase' | '';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  action?: ActionType;
  actionLink?: string;
}

export interface FinancialItem {
  id: string;
  title: string;
  details: string;
  fileUrl?: string;
  fileName?: string;
  action?: ActionType;
  actionLink?: string;
}

export interface AssessmentItem {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  action?: ActionType;
  actionLink?: string;
}

export interface InvestorItem {
  id: string;
  name: string;
  details: string;
  fileUrl?: string;
  fileName?: string;
  action?: ActionType;
  actionLink?: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  action?: ActionType;
  actionLink?: string;
}

export interface DynamicSectionItem {
  id: string;
  title: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
  action?: ActionType;
  actionLink?: string;
}

export interface DynamicSection {
  id: string;
  title: string;
  items: DynamicSectionItem[];
}

export interface CompanyProfile {
  id?: string;
  name: string;
  category: string;
  size: CompanySize;
  location: string;
  description: string;
  website?: string;
  revenue?: string;
  foundedDate?: string;
  headquarters?: string;
  mission?: string;
  companyValues?: string[];
  logo?: string;
  portfolio?: PortfolioItem[];
  financialStatement?: FinancialItem[];
  assessment?: AssessmentItem[];
  investors?: InvestorItem[];
  transformationPlan?: TransformationItem[];
  dynamicSections?: DynamicSection[];
  createdAt?: string;
  updatedAt?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}
