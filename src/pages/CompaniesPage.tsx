
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CompanyList } from "@/components/companies/company-list";

const CompaniesPage = () => {
  return (
    <DashboardLayout>
      <CompanyList />
    </DashboardLayout>
  );
};

export default CompaniesPage;
