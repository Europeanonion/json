import { useEffect } from 'react';
import { useWorkoutContext } from '../context/WorkoutContext';
import { useLocalStorage } from './useLocalStorage';
import { Workout } from '../types';

export const useWorkouts = () => {
  const { workouts, addWorkout } = useWorkoutContext();
  const [storedWorkouts, setStoredWorkouts] = useLocalStorage<Workout[]>('workouts', []);

  useEffect(() => {
    if (storedWorkouts.length && !workouts.length) {
      storedWorkouts.forEach(workout => addWorkout(workout));
    }
  }, []);

  return { workouts, addWorkout };
};