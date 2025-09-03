import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Paper, Alert } from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface FileUploadComponentProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
  acceptedFileTypes?: string[];
  disabled?: boolean;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  onFilesChange,
  maxFiles = 5,
  maxSizePerFile = 10, // 10MB default
  acceptedFileTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".txt"],
  disabled = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSizePerFile * 1024 * 1024) {
      return `File "${file.name}" exceeds ${maxSizePerFile}MB limit`;
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedFileTypes.some((type) => type.toLowerCase() === fileExtension)) {
      return `File type "${fileExtension}" is not allowed`;
    }

    return null;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Check total file count
    if (selectedFiles.length + files.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      setErrors(newErrors);
      return;
    }

    // Validate each file
    files.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
    setErrors([]);

    // Reset input
    event.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        <AttachFileIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        File Attachments
      </Typography>

      {/* Upload Button */}
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        disabled={disabled || selectedFiles.length >= maxFiles}
        sx={{ mb: 2 }}
      >
        Choose Files
        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} accept={acceptedFileTypes.join(",")} />
      </Button>

      {/* File Info */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Accepted formats: {acceptedFileTypes.join(", ")} | Max size: {maxSizePerFile}MB per file | Max files: {maxFiles}
      </Typography>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Selected Files ({selectedFiles.length}/{maxFiles}):
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {selectedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  backgroundColor: "action.hover",
                  borderRadius: 1,
                }}
              >
                <InsertDriveFileIcon color="primary" />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" noWrap>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(file.size)}
                  </Typography>
                </Box>
                <IconButton size="small" color="error" onClick={() => handleRemoveFile(index)} disabled={disabled}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FileUploadComponent;
