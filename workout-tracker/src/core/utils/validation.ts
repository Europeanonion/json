import type { Exercise, ValidationResult } from '../types';

export const validateExercise = (exercise: Partial<Exercise>): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!exercise.name?.trim()) {
    errors.name = 'Exercise name is required';
  }

  if (!exercise.workingSets?.trim()) {
    errors.workingSets = 'Working sets are required';
  }

  if (!exercise.reps?.trim()) {
    errors.reps = 'Reps are required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateWorkout = (workout: Workout): boolean => {
  return !!(
    workout.name &&
    workout.phase &&
    workout.week &&
    workout.exercises?.length
  );
};