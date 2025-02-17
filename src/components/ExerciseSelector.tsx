import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { ExerciseDataService } from '../services/ExerciseDataService';

interface ExerciseSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (exercise: ExerciseData) => void;
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  open,
  onClose,
  onSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const exerciseService = ExerciseDataService.getInstance();

  useEffect(() => {
    if (searchTerm) {
      const search = async () => {
        try {
          const results = await exerciseService.searchExercises(searchTerm);
          setExercises(results);
        } catch (error) {
          console.error('Error searching exercises:', error);
        }
      };
      search();
    }
  }, [searchTerm]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Select Exercise</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Search exercises"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List>
          {exercises.map((exercise) => (
            <ListItem 
              key={exercise.id}
              button
              onClick={() => onSelect(exercise)}
            >
              <ListItemText
                primary={exercise.name}
                secondary={`${exercise.muscle} - ${exercise.difficulty}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};