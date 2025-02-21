import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ExerciseProvider } from '../ExerciseProvider'
import { useExerciseContext } from '../../hooks/useExerciseContext'
import type { Exercise } from '../../types/exercise.types'
import { ExerciseActionType } from '../../types/exercise.types'

const validExercise: Exercise = {
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

const TestComponent = () => {
  const { state, dispatch } = useExerciseContext()
  
  const handleAddExercise = (exercise: Exercise = validExercise) => {
    dispatch({
      type: ExerciseActionType.ADD_EXERCISE,
      payload: exercise
    })
  }

  return (
    <div>
      <button onClick={() => handleAddExercise()}>Add Valid Exercise</button>
      <button onClick={() => handleAddExercise({
        ...validExercise,
        rpe: '11' // Invalid RPE
      })}>Add Invalid RPE Exercise</button>
      <button onClick={() => handleAddExercise({
        ...validExercise,
        warmupSets: 'invalid' // Invalid warmup sets
      })}>Add Invalid Sets Exercise</button>
      {state.exercises.map(exercise => (
        <div key={exercise.id} data-testid="exercise-item">
          {exercise.name} (RPE: {exercise.rpe})
        </div>
      ))}
      {state.error && <div data-testid="error-message">{state.error.message}</div>}
    </div>
  )
}

describe('ExerciseProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('provides exercise state and dispatch to children', async () => {
    render(
      <ExerciseProvider>
        <TestComponent />
      </ExerciseProvider>
    )

    // Initially no exercises
    expect(screen.queryByTestId('exercise-item')).not.toBeInTheDocument()

    // Add a valid exercise
    fireEvent.click(screen.getByText('Add Valid Exercise'))

    // Exercise should be displayed
    await waitFor(() => {
      expect(screen.getByText('Test Exercise (RPE: 8)')).toBeInTheDocument()
    })
  })

  it('validates RPE range', async () => {
    render(
      <ExerciseProvider>
        <TestComponent />
      </ExerciseProvider>
    )

    // Add exercise with invalid RPE
    fireEvent.click(screen.getByText('Add Invalid RPE Exercise'))

    // Exercise should not be added
    await waitFor(() => {
      expect(screen.queryByTestId('exercise-item')).not.toBeInTheDocument()
    })
  })

  it('validates sets format', async () => {
    render(
      <ExerciseProvider>
        <TestComponent />
      </ExerciseProvider>
    )

    // Add exercise with invalid sets
    fireEvent.click(screen.getByText('Add Invalid Sets Exercise'))

    // Exercise should not be added
    await waitFor(() => {
      expect(screen.queryByTestId('exercise-item')).not.toBeInTheDocument()
    })
  })

  it('maintains state between renders', async () => {
    const { rerender } = render(
      <ExerciseProvider>
        <TestComponent />
      </ExerciseProvider>
    )

    // Add an exercise
    fireEvent.click(screen.getByText('Add Valid Exercise'))

    // Wait for exercise to be added
    await waitFor(() => {
      expect(screen.getByText('Test Exercise (RPE: 8)')).toBeInTheDocument()
    })

    // Rerender the component
    rerender(
      <ExerciseProvider>
        <TestComponent />
      </ExerciseProvider>
    )

    // Exercise should still be there
    expect(screen.getByText('Test Exercise (RPE: 8)')).toBeInTheDocument()
  })

  it('throws error when context is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error')
    consoleSpy.mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow(
      'useExerciseContext must be used within an ExerciseProvider'
    )

    consoleSpy.mockRestore()
  })
})
