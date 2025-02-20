import type { WorkoutState, WorkoutAction } from '../types/workout.types'

export const initialWorkoutState: WorkoutState = {
  workouts: [],
  selectedWorkout: null,
  isLoading: false,
  error: null
}

export function workoutReducer(state: WorkoutState, action: WorkoutAction): WorkoutState {
  switch (action.type) {
    case 'ADD_WORKOUT':
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
        error: null
      }
    case 'REMOVE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter(workout => workout.id !== action.payload),
        selectedWorkout: null,
        error: null
      }
    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map(workout => 
          workout.id === action.payload.id ? action.payload : workout
        ),
        error: null
      }
    case 'SELECT_WORKOUT':
      return {
        ...state,
        selectedWorkout: action.payload,
        error: null
      }
    case 'CLEAR_SELECTED_WORKOUT':
      return {
        ...state,
        selectedWorkout: null,
        error: null
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}
