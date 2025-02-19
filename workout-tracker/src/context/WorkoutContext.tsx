import { createContext, useContext, ReactNode, useState } from 'react';
import { Workout, Exercise } from '../types';
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

interface WorkoutContextType {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (index: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addWorkout = (workout: Workout) => {
    setWorkouts(prev => [...prev, workout]);
  };

  const addExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, exercises, addExercise, removeExercise }}>
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

const TestComponent = () => {
  const { exercises, addExercise, removeExercise } = useWorkoutContext()

  const handleAdd = () => {
    addExercise({
      name: 'Test Exercise',
      warmupSets: '2',
      workingSets: '3',
      reps: '8-12',
      rpe: '8',
      rest: '2-3 min',
      substitutions: [],
      notes: 'Test note'
    })
  }

  return (
    <div>
      <button onClick={handleAdd}>Add Exercise</button>
      {exercises.map((exercise, index) => (
        <div key={index} data-testid="exercise-item">
          <span>{exercise.name}</span>
          <button onClick={() => removeExercise(index)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

describe('WorkoutContext', () => {
  it('provides exercise management functionality', () => {
    render(
      <WorkoutProvider>
        <TestComponent />
      </WorkoutProvider>
    )

    // Initial state should be empty
    expect(screen.queryByTestId('exercise-item')).not.toBeInTheDocument()

    // Add an exercise
    fireEvent.click(screen.getByText('Add Exercise'))
    expect(screen.getByText('Test Exercise')).toBeInTheDocument()

    // Remove the exercise
    fireEvent.click(screen.getByText('Remove'))
    expect(screen.queryByTestId('exercise-item')).not.toBeInTheDocument()
  })

  it('throws error when used outside provider', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useWorkoutContext must be used within a WorkoutProvider'
    )
  })
})