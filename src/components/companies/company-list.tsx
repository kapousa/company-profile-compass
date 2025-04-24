
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCompanies } from "@/contexts/CompanyContext";
import { CompanyProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { truncateText } from "@/lib/utils";
import { COMPANY_CATEGORIES, LOCATIONS } from "@/data/mockData";

export function CompanyList() {
  const { companies, loading, deleteCompany } = useCompanies();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Filter companies based on search term and filters
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || company.category === categoryFilter;
    const matchesLocation = locationFilter === "all" || company.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(id);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading companies...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Companies</h2>
        <Link to="/companies/add">
          <Button>Add New Company</Button>
        </Link>
      </div>
      
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:flex-1">
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {COMPANY_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-64">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {LOCATIONS.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No companies found matching your criteria.
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map(company => (
            <CompanyCard 
              key={company.id} 
              company={company} 
              onDelete={() => company.id && handleDelete(company.id)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CompanyCardProps {
  company: CompanyProfile;
  onDelete: () => void;
}

function CompanyCard({ company, onDelete }: CompanyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {company.logo ? (
          <img 
            src={company.logo} 
            alt={`${company.name} logo`}
            className="w-full h-full object-contain p-2" 
          />
        ) : (
          <div className="text-gray-400 text-2xl font-bold">{company.name.charAt(0)}</div>
        )}
      </div>
      <CardContent className="p-4 space-y-4">
        <h3 className="text-lg font-semibold line-clamp-1">{company.name}</h3>
        
        <div className="text-sm text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>Category:</span>
            <span className="font-medium">{company.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Location:</span>
            <span className="font-medium">{company.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Size:</span>
            <span className="font-medium">{company.size}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {truncateText(company.description, 100)}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <Link to={`/companies/view/${company.id}`}>
            <Button variant="outline" size="sm">View</Button>
          </Link>
          <div className="flex items-center gap-2">
            <Link to={`/companies/edit/${company.id}`}>
              <Button variant="outline" size="sm">Edit</Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
