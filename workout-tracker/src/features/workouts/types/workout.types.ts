import type { Exercise } from '../../exercises/types/exercise.types'

export interface Workout {
  id: string
  name: string
  phase: string
  week: number
  exercises: Exercise[]
}

export interface WorkoutState {
  workouts: Workout[]
  selectedWorkout: Workout | null
  isLoading: boolean
  error: Error | null
}

export type WorkoutAction =
  | { type: 'ADD_WORKOUT'; payload: Workout }
  | { type: 'REMOVE_WORKOUT'; payload: string }
  | { type: 'UPDATE_WORKOUT'; payload: Workout }
  | { type: 'SELECT_WORKOUT'; payload: Workout }
  | { type: 'CLEAR_SELECTED_WORKOUT' }
  | { type: 'SET_ERROR'; payload: Error }
  | { type: 'SET_LOADING'; payload: boolean }

export interface WorkoutContextValue {
  state: WorkoutState
  dispatch: React.Dispatch<WorkoutAction>
}
