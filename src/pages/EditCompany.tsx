
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanies } from "@/contexts/CompanyContext";

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCompanyById } = useCompanies();
  const company = getCompanyById(id || "");

  if (!company) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900">Company not found</h1>
          <p className="text-gray-500 mt-2">The company you're trying to edit doesn't exist.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edit Company: {company.name}</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg border space-y-6">
          <p className="text-gray-600">
            Edit company form will be implemented here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditCompany;
