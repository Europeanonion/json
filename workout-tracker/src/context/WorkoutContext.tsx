import { createContext, useContext, useReducer } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Exercise, WorkoutState } from '../types'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

type Action =
  | { type: 'ADD_EXERCISE'; payload: Exercise }
  | { type: 'REMOVE_EXERCISE'; payload: string }
  | { type: 'UPDATE_EXERCISE'; payload: Exercise }
  | { type: 'SET_ERROR'; payload: Error }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: WorkoutState = {
  exercises: [],
  selectedExercise: null,
  isLoading: false,
  error: null
}

function workoutReducer(state: WorkoutState, action: Action): WorkoutState {
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
        exercises: state.exercises.filter(ex => ex.id !== action.payload),
        selectedExercise: null,
        error: null
      }
    case 'UPDATE_EXERCISE':
      return {
        ...state,
        exercises: state.exercises.map(ex => 
          ex.id === action.payload.id ? action.payload : ex
        ),
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

const WorkoutContext = createContext<{
  state: WorkoutState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined)

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [savedExercises, setSavedExercises] = useLocalStorage<Exercise[]>('exercises', [])
  const [state, dispatch] = useReducer(workoutReducer, {
    ...initialState,
    exercises: savedExercises
  })

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const context = useContext(WorkoutContext)
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider')
  }
  return context
}

const TestComponent = () => {
  const { state, dispatch } = useWorkout()

  const handleAdd = () => {
    dispatch({
      type: 'ADD_EXERCISE',
      payload: {
        id: '1',
        name: 'Test Exercise',
        warmupSets: '2',
        workingSets: '3',
        reps: '8-12',
        rpe: '8',
        rest: '2-3 min',
        substitutions: [],
        notes: 'Test note'
      }
    })
  }

  return (
    <div>
      <button onClick={handleAdd}>Add Exercise</button>
      {state.exercises.map((exercise, index) => (
        <div key={index} data-testid="exercise-item">
          <span>{exercise.name}</span>
          <button onClick={() => dispatch({ type: 'REMOVE_EXERCISE', payload: exercise.id })}>Remove</button>
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
      'useWorkout must be used within a WorkoutProvider'
    )
  })
})