import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ExerciseForm } from '../ExerciseForm'
import { ExerciseContext } from '../../context/ExerciseContext'
import { Exercise } from '../../types/exercise.types'

// Mock uuid to generate predictable IDs
vi.mock('uuid', () => ({
  v4: () => 'test-uuid'
}))

describe('ExerciseForm', () => {
  const mockDispatch = vi.fn()
  const renderWithContext = () => {
    return render(
      <ExerciseContext.Provider value={{ 
        state: { 
          exercises: [], 
          selectedExercise: null, 
          isLoading: false, 
          error: null 
        }, 
        dispatch: mockDispatch 
      }}>
        <ExerciseForm />
      </ExerciseContext.Provider>
    )
  }

  it('renders all form fields', () => {
    renderWithContext()
    
    expect(screen.getByLabelText(/Exercise Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Warmup Sets/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Working Sets/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Reps/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/RPE/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Rest Period/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument()
  })

  it('validates form submission', () => {
    renderWithContext()
    
    const submitButton = screen.getByText(/Add Exercise/i)
    fireEvent.click(submitButton)

    // Should show name error
    expect(screen.getByText('Exercise name is required')).toBeInTheDocument()
  })

  it('submits a valid exercise', () => {
    renderWithContext()
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Exercise Name/i), { 
      target: { value: 'Bench Press' } 
    })
    fireEvent.change(screen.getByLabelText(/Reps/i), { 
      target: { value: '8-12' } 
    })

    const submitButton = screen.getByText(/Add Exercise/i)
    fireEvent.click(submitButton)

    // Check dispatch was called with correct payload
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_EXERCISE',
      payload: {
        id: 'test-uuid',
        name: 'Bench Press',
        warmupSets: '0',
        workingSets: '3',
        reps: '8-12',
        rpe: '7',
        rest: '2-3 min',
        substitutions: [],
        notes: ''
      }
    })
  })

  it('resets form after successful submission', () => {
    renderWithContext()
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Exercise Name/i), { 
      target: { value: 'Bench Press' } 
    })

    const submitButton = screen.getByText(/Add Exercise/i)
    fireEvent.click(submitButton)

    // Check form is reset
    expect(screen.getByLabelText(/Exercise Name/i)).toHaveValue('')
  })
})
