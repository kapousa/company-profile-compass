
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useNavigate } from "react-router-dom";
import { useCompanies } from "@/contexts/CompanyContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AddCompany = () => {
  const navigate = useNavigate();
  const { addCompany } = useCompanies();

  const handleAddCompany = () => {
    // For now we'll just add a simple company to demonstrate functionality
    const newCompany = {
      name: "New Company",
      category: "Technology",
      size: "Small",
      location: "United States",
      description: "<p>This is a new company description.</p>",
      website: "https://example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    addCompany(newCompany);
    toast.success("Company created successfully!");
    navigate("/companies");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add New Company</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg border space-y-6">
          <p className="text-gray-600">
            This is a placeholder for the company creation form.
            Click the button below to create a sample company.
          </p>
          
          <Button onClick={handleAddCompany}>
            Create Sample Company
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddCompany;
