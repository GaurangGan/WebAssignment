"use client";

import { useState, useRef } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  disabled?: boolean;
}

export function FileUpload({ file, setFile, disabled }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      if (inputRef.current) {
        inputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    if (disabled) return;
    inputRef.current?.click();
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog}
      className={cn(
        "relative group flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-8 text-center transition-colors duration-300 hover:border-primary",
        isDragging && "border-primary bg-primary/10",
        disabled && "cursor-not-allowed opacity-50 hover:border-dashed"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        name="pdf"
        id="pdf-upload"
        className="hidden"
        onChange={handleFileChange}
        accept="application/pdf"
        disabled={disabled}
      />
      
      {file ? (
        <div className="flex flex-col items-center gap-4 cursor-default" onClick={(e) => e.stopPropagation()}>
          <FileIcon className="h-16 w-16 text-primary" />
          <p className="font-medium text-foreground">{file.name}</p>
          <p className="text-sm text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</p>
          {!disabled && (
            <Button variant="ghost" size="sm" onClick={removeFile} className="mt-2 text-destructive hover:text-destructive hover:bg-destructive/10 z-10">
              <X className="mr-2 h-4 w-4" />
              Remove file
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <UploadCloud className="h-16 w-16 text-muted-foreground transition-colors group-hover:text-primary" />
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Drag & drop your PDF here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
          </div>
        </div>
      )}
    </div>
  );
}
