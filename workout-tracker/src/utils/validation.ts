import { Exercise, Workout } from '../types';

export const validateExercise = (exercise: Exercise): boolean => {
  return !!(
    exercise.name &&
    exercise.workingSets &&
    exercise.reps
  );
};

export const validateWorkout = (workout: Workout): boolean => {
  return !!(
    workout.name &&
    workout.phase &&
    workout.week &&
    workout.exercises?.length
  );
};