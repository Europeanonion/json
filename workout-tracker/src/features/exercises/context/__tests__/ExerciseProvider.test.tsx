import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ExerciseProvider } from '../ExerciseProvider'
import { useExerciseContext } from '../../hooks/useExerciseContext'

// Test component that uses the context
const TestComponent = () => {
  const { state, dispatch } = useExerciseContext()
  
  const handleAddExercise = () => {
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
      <button onClick={handleAddExercise}>Add Exercise</button>
      {state.exercises.map(exercise => (
        <div key={exercise.id} data-testid="exercise-item">
          {exercise.name}
        </div>
      ))}
    </div>
  )
}

describe('ExerciseProvider', () => {
  it('provides exercise state and dispatch to children', () => {
    render(
      <ExerciseProvider>
        <TestComponent />
      </ExerciseProvider>
    )

    // Initially no exercises
    expect(screen.queryByTestId('exercise-item')).not.toBeInTheDocument()

    // Add an exercise
    fireEvent.click(screen.getByText('Add Exercise'))

    // Exercise should be displayed
    expect(screen.getByText('Test Exercise')).toBeInTheDocument()
  })

  it('maintains state between renders', () => {
    const { rerender } = render(
      <ExerciseProvider>
        <TestComponent />
      </ExerciseProvider>
    )

    // Add an exercise
    fireEvent.click(screen.getByText('Add Exercise'))

    // Rerender the component
    rerender(
      <ExerciseProvider>
        <TestComponent />
      </ExerciseProvider>
    )

    // Exercise should still be there
    expect(screen.getByText('Test Exercise')).toBeInTheDocument()
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
