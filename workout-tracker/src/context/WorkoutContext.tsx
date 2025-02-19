import { createContext, useContext, ReactNode, useState } from 'react';
import { Workout } from '../types';

interface WorkoutContextType {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addWorkout = (workout: Workout) => {
    setWorkouts(prev => [...prev, workout]);
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkoutContext must be used within a WorkoutProvider');
  }
  return context;
};