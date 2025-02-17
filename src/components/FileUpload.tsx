import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { ExcelStructureValidator } from '../validators/ExcelValidator';
import { Program } from '../types/workout';

interface FileUploadProps {
  onFileProcessed: (program: Program) => void;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed, isUploading, setIsUploading }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const validator = new ExcelStructureValidator();
      const validationResult = await validator.validateFile(file);

      if (!validationResult.isValid) {
        setError('Invalid file structure. Please ensure the file follows the required template.');
        setIsUploading(false);
        return;
      }

      // Process valid file
      const processor = new WorkoutFileProcessor();
      const program = await processor.processExcelFile(file);
      
      onFileProcessed(program);
    } catch (error) {
      console.error('File upload error:', error);
      setError('Failed to process the file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Upload Workout File</Typography>
      <input 
        type="file" 
        accept=".xlsx,.xls,.csv" 
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      {isUploading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default FileUpload;