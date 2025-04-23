
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useCompanies } from "@/contexts/CompanyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { companies, loading } = useCompanies();
  const [stats, setStats] = useState({
    totalCompanies: 0,
    categoriesCount: {} as Record<string, number>,
    locationsCount: {} as Record<string, number>
  });

  useEffect(() => {
    if (!loading) {
      // Calculate statistics
      const categoriesCount: Record<string, number> = {};
      const locationsCount: Record<string, number> = {};
      
      companies.forEach(company => {
        // Count by category
        if (company.category) {
          categoriesCount[company.category] = (categoriesCount[company.category] || 0) + 1;
        }
        
        // Count by location
        if (company.location) {
          locationsCount[company.location] = (locationsCount[company.location] || 0) + 1;
        }
      });
      
      setStats({
        totalCompanies: companies.length,
        categoriesCount,
        locationsCount
      });
    }
  }, [companies, loading]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/companies/add">
            <Button>Add New Company</Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center p-8">Loading statistics...</div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Total Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalCompanies}</div>
                  <Link to="/companies" className="text-sm text-blue-600 hover:underline">
                    View all companies
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold">{Object.keys(stats.categoriesCount).length}</div>
                  <div className="text-sm">
                    {Object.entries(stats.categoriesCount)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([category, count]) => (
                        <div key={category} className="flex justify-between">
                          <span>{category}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Locations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold">{Object.keys(stats.locationsCount).length}</div>
                  <div className="text-sm">
                    {Object.entries(stats.locationsCount)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([location, count]) => (
                        <div key={location} className="flex justify-between">
                          <span>{location}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent companies */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Companies</CardTitle>
              </CardHeader>
              <CardContent>
                {companies.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    No companies added yet.
                    <div className="mt-2">
                      <Link to="/companies/add">
                        <Button variant="outline" size="sm">Add Your First Company</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {companies.slice(0, 6).map(company => (
                        <Link 
                          key={company.id} 
                          to={`/companies/view/${company.id}`}
                          className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.category}</div>
                        </Link>
                      ))}
                    </div>
                    
                    {companies.length > 6 && (
                      <div className="text-center">
                        <Link to="/companies">
                          <Button variant="outline">View All Companies</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
