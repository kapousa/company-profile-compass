
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// A simple rich text editor component using basic textarea
// In a production app, you would integrate a full-featured rich text editor like TinyMCE, CKEditor, or QuillJS

interface RichTextEditorProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  minRows?: number;
  placeholder?: string;
  error?: string;
}

export function RichTextEditor({
  id,
  label,
  value,
  onChange,
  minRows = 5,
  placeholder = "Enter content...",
  error
}: RichTextEditorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Textarea
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={minRows}
        className={`min-h-[120px] ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
