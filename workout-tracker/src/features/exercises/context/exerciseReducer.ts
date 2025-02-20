import type { ExerciseState, ExerciseAction } from '../types/exercise.types'

export const initialExerciseState: ExerciseState = {
  exercises: [],
  selectedExercise: null,
  isLoading: false,
  error: null
}

export function exerciseReducer(state: ExerciseState, action: ExerciseAction): ExerciseState {
  switch (action.type) {
    case 'ADD_EXERCISE':
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
        error: null
      }
    case 'REMOVE_EXERCISE':
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise.id !== action.payload),
        selectedExercise: null,
        error: null
      }
    case 'UPDATE_EXERCISE':
      return {
        ...state,
        exercises: state.exercises.map(exercise => 
          exercise.id === action.payload.id ? action.payload : exercise
        ),
        error: null
      }
    case 'SELECT_EXERCISE':
      return {
        ...state,
        selectedExercise: action.payload,
        error: null
      }
    case 'CLEAR_SELECTED_EXERCISE':
      return {
        ...state,
        selectedExercise: null,
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
