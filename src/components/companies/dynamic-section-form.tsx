
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { FileUpload } from "@/components/ui/file-upload";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DynamicSection, DynamicSectionItem, ActionType } from "@/types";
import { generateId } from "@/lib/utils";
import { ACTION_TYPES } from "@/data/mockData";

interface DynamicSectionFormProps {
  sections: DynamicSection[];
  onChange: (sections: DynamicSection[]) => void;
}

export function DynamicSectionForm({ sections = [], onChange }: DynamicSectionFormProps) {
  const handleAddSection = () => {
    const newSection: DynamicSection = {
      id: generateId(),
      title: "",
      items: []
    };
    onChange([...sections, newSection]);
  };

  const handleUpdateSection = (index: number, updatedSection: DynamicSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = updatedSection;
    onChange(updatedSections);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    onChange(updatedSections);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Dynamic Sections</h3>
        <Button 
          type="button" 
          onClick={handleAddSection}
          variant="outline"
        >
          Add Section
        </Button>
      </div>

      {sections.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-md">
          No dynamic sections added yet. Click "Add Section" to create your first section.
        </div>
      )}

      {sections.map((section, index) => (
        <SectionEditor
          key={section.id}
          section={section}
          onUpdate={(updatedSection) => handleUpdateSection(index, updatedSection)}
          onRemove={() => handleRemoveSection(index)}
        />
      ))}
    </div>
  );
}

interface SectionEditorProps {
  section: DynamicSection;
  onUpdate: (section: DynamicSection) => void;
  onRemove: () => void;
}

function SectionEditor({ section, onUpdate, onRemove }: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...section,
      title: e.target.value
    });
  };

  const handleAddItem = () => {
    const newItem: DynamicSectionItem = {
      id: generateId(),
      title: "",
      content: "",
      action: "",
      actionLink: ""
    };
    
    onUpdate({
      ...section,
      items: [...section.items, newItem]
    });
  };

  const handleUpdateItem = (index: number, updatedItem: DynamicSectionItem) => {
    const updatedItems = [...section.items];
    updatedItems[index] = updatedItem;
    
    onUpdate({
      ...section,
      items: updatedItems
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...section.items];
    updatedItems.splice(index, 1);
    
    onUpdate({
      ...section,
      items: updatedItems
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor={`section-title-${section.id}`}>Section Title</Label>
              <Input
                id={`section-title-${section.id}`}
                value={section.title}
                onChange={handleTitleChange}
                placeholder="Enter section title"
              />
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button 
                type="button" 
                onClick={() => setIsExpanded(!isExpanded)}
                variant="ghost" 
                size="sm"
              >
                {isExpanded ? "Collapse" : "Expand"}
              </Button>
              <Button 
                type="button" 
                onClick={onRemove}
                variant="outline" 
                size="sm" 
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </Button>
            </div>
          </div>
          
          {isExpanded && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Section Items</h4>
                <Button 
                  type="button" 
                  onClick={handleAddItem}
                  variant="outline" 
                  size="sm"
                >
                  Add Item
                </Button>
              </div>
              
              {section.items.length === 0 ? (
                <div className="text-center py-6 text-gray-500 border border-dashed rounded-md">
                  No items in this section yet. Click "Add Item" to create your first item.
                </div>
              ) : (
                <div className="space-y-6">
                  {section.items.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="bg-gray-50 p-4 rounded-md space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Item #{index + 1}</h5>
                        <Button 
                          type="button" 
                          onClick={() => handleRemoveItem(index)}
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove Item
                        </Button>
                      </div>
                      
                      <div>
                        <Label htmlFor={`item-title-${item.id}`}>Title/Key</Label>
                        <Input
                          id={`item-title-${item.id}`}
                          value={item.title}
                          onChange={(e) => handleUpdateItem(index, { ...item, title: e.target.value })}
                          placeholder="Enter item title"
                        />
                      </div>
                      
                      <RichTextEditor
                        id={`item-content-${item.id}`}
                        label="Content"
                        value={item.content}
                        onChange={(content) => handleUpdateItem(index, { ...item, content })}
                      />
                      
                      <FileUpload
                        id={`item-file-${item.id}`}
                        label="Attachment (Optional)"
                        onFileSelect={(file) => {
                          if (file) {
                            // In a real app, you would upload the file to a server and get a URL
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              handleUpdateItem(index, {
                                ...item,
                                fileUrl: e.target?.result as string,
                                fileName: file.name
                              });
                            };
                            reader.readAsDataURL(file);
                          } else {
                            handleUpdateItem(index, {
                              ...item,
                              fileUrl: undefined,
                              fileName: undefined
                            });
                          }
                        }}
                        currentFileName={item.fileName}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`item-action-${item.id}`}>Action (Optional)</Label>
                          <Select
                            value={item.action}
                            onValueChange={(value) => handleUpdateItem(index, { 
                              ...item, 
                              action: value as ActionType 
                            })}
                          >
                            <SelectTrigger id={`item-action-${item.id}`}>
                              <SelectValue placeholder="Select an action" />
                            </SelectTrigger>
                            <SelectContent>
                              {ACTION_TYPES.map(type => (
                                <SelectItem key={type} value={type}>{type || "None"}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {item.action && (
                          <div>
                            <Label htmlFor={`item-link-${item.id}`}>Action Link</Label>
                            <Input
                              id={`item-link-${item.id}`}
                              value={item.actionLink || ""}
                              onChange={(e) => handleUpdateItem(index, { 
                                ...item, 
                                actionLink: e.target.value 
                              })}
                              placeholder="https://..."
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
