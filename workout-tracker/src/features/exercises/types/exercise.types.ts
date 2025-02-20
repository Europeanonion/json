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

export interface ExerciseState {
  exercises: Exercise[]
  selectedExercise: Exercise | null
  isLoading: boolean
  error: Error | null
}

export type ExerciseAction =
  | { type: 'ADD_EXERCISE'; payload: Exercise }
  | { type: 'REMOVE_EXERCISE'; payload: string }
  | { type: 'UPDATE_EXERCISE'; payload: Exercise }
  | { type: 'SELECT_EXERCISE'; payload: Exercise }
  | { type: 'CLEAR_SELECTED_EXERCISE' }
  | { type: 'SET_ERROR'; payload: Error }
  | { type: 'SET_LOADING'; payload: boolean }

export interface ExerciseContextValue {
  state: ExerciseState
  dispatch: React.Dispatch<ExerciseAction>
}
