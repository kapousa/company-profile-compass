
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// A simple file upload component
// In a production app, you would integrate with a file storage service

interface FileUploadProps {
  id: string;
  label?: string;
  onFileSelect: (file: File | null) => void;
  currentFileName?: string;
  accept?: string;
  error?: string;
}

export function FileUpload({
  id,
  label,
  onFileSelect,
  currentFileName,
  accept = "image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
  error
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | undefined>(currentFileName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setFileName(file?.name);
    onFileSelect(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFileName(undefined);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
      )}
      
      <div className="flex flex-col gap-2">
        <Input
          id={id}
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          className={`${error ? 'border-red-500' : ''}`}
        />
        
        {fileName && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 truncate flex-1">
              {fileName}
            </span>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleClearFile}
            >
              Clear
            </Button>
          </div>
        )}
        
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
