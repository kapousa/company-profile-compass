
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useCompanies } from "@/contexts/CompanyContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const ViewCompany = () => {
  const { id } = useParams<{ id: string }>();
  const { getCompany, deleteCompany } = useCompanies();
  const navigate = useNavigate();
  const [company, setCompany] = useState(getCompany(id || ""));

  useEffect(() => {
    const companyData = getCompany(id || "");
    if (!companyData) {
      navigate("/companies");
    } else {
      setCompany(companyData);
    }
  }, [id, getCompany, navigate]);

  if (!company) {
    return (
      <DashboardLayout>
        <div className="text-center">Company not found</div>
      </DashboardLayout>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(id || "");
      navigate("/companies");
    }
  };

  // Render item section (for portfolio, financials, etc.)
  const renderItemsSection = (
    title: string,
    items: Array<any>,
    keyField: string = "title"
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h4 className="font-medium text-lg">{item[keyField]}</h4>
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: item.description || item.details || "" }} />
                
                {item.fileUrl && (
                  <div className="mt-2">
                    <a 
                      href={item.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {item.fileName || "Attached file"}
                    </a>
                  </div>
                )}
                
                {item.action && item.actionLink && (
                  <div className="mt-3">
                    <Button size="sm" asChild>
                      <a href={item.actionLink} target="_blank" rel="noopener noreferrer">
                        {item.action}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{company.name}</h1>
          <div className="flex items-center gap-2">
            <Link to={`/companies/edit/${company.id}`}>
              <Button variant="outline">Edit Company</Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: company.description }} />
                
                {company.mission && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">Mission</h3>
                    <div dangerouslySetInnerHTML={{ __html: company.mission }} />
                  </div>
                )}
                
                {company.companyValues && company.companyValues.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">Company Values</h3>
                    <div className="flex flex-wrap gap-2">
                      {company.companyValues.map((value, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd>{company.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd>{company.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Size</dt>
                  <dd>{company.size}</dd>
                </div>
                {company.website && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                    <dd>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {company.website}
                      </a>
                    </dd>
                  </div>
                )}
                {company.foundedDate && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Founded</dt>
                    <dd>{formatDate(company.foundedDate)}</dd>
                  </div>
                )}
                {company.headquarters && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Headquarters</dt>
                    <dd>{company.headquarters}</dd>
                  </div>
                )}
                {company.revenue && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Revenue</dt>
                    <dd>{company.revenue}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        </div>
        
        {/* Company Logo */}
        {company.logo && (
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="max-h-64 object-contain"
              />
            </CardContent>
          </Card>
        )}
        
        {/* Portfolio */}
        {renderItemsSection("Portfolio", company.portfolio)}
        
        {/* Financial Statement */}
        {renderItemsSection("Financial Statement", company.financialStatement)}
        
        {/* Assessment */}
        {renderItemsSection("Assessment", company.assessment)}
        
        {/* Investors */}
        {renderItemsSection("Investors", company.investors, "name")}
        
        {/* Transformation Plan */}
        {renderItemsSection("Transformation Plan (Careers)", company.transformationPlan)}
        
        {/* Dynamic Sections */}
        {company.dynamicSections && company.dynamicSections.map(section => (
          <Card key={section.id} className="mb-6">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-lg">{item.title}</h4>
                    <div className="mt-2" dangerouslySetInnerHTML={{ __html: item.content }} />
                    
                    {item.fileUrl && (
                      <div className="mt-2">
                        <a 
                          href={item.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {item.fileName || "Attached file"}
                        </a>
                      </div>
                    )}
                    
                    {item.action && item.actionLink && (
                      <div className="mt-3">
                        <Button size="sm" asChild>
                          <a href={item.actionLink} target="_blank" rel="noopener noreferrer">
                            {item.action}
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="flex justify-between pt-4">
          <Link to="/companies">
            <Button variant="outline">Back to Companies</Button>
          </Link>
          <Link to={`/companies/edit/${company.id}`}>
            <Button>Edit Company</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewCompany;
