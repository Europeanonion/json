export interface Exercise {
  id: string
  name: string
  warmupSets: string
  workingSets: string
  reps: string
  rpe: string
  rest: string
  substitutions: string[]
  notes: string
}

export interface Workout {
  name: string;
  phase: string;
  week: number;
  exercises: Exercise[];
}

export interface WorkoutContextType {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (id: number, workout: Workout) => void;
}

export interface WorkoutState {
  exercises: Exercise[]
  selectedExercise: Exercise | null
}