import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ExerciseList } from '../ExerciseList'
import { ExerciseContext } from '../../context/ExerciseContext'
import type { Exercise } from '../../types/exercise.types'

const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    warmupSets: '2',
    workingSets: '3',
    reps: '8-12',
    rpe: '8',
    rest: '2-3 min',
    substitutions: [],
    notes: 'Keep tight form'
  },
  {
    id: '2',
    name: 'Squat',
    warmupSets: '3',
    workingSets: '4',
    reps: '5',
    rpe: '9',
    rest: '3-5 min',
    substitutions: [],
    notes: 'Focus on depth'
  }
]

describe('ExerciseList', () => {
  const mockDispatch = vi.fn()

  const renderWithContext = (exercises = mockExercises) => {
    return render(
      <ExerciseContext.Provider value={{
        state: {
          exercises,
          selectedExercise: null,
          isLoading: false,
          error: null
        },
        dispatch: mockDispatch
      }}>
        <ExerciseList />
      </ExerciseContext.Provider>
    )
  }

  it('renders loading spinner when loading', () => {
    render(
      <ExerciseContext.Provider value={{
        state: {
          exercises: [],
          selectedExercise: null,
          isLoading: true,
          error: null
        },
        dispatch: mockDispatch
      }}>
        <ExerciseList />
      </ExerciseContext.Provider>
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders empty state message when no exercises', () => {
    renderWithContext([])
    expect(screen.getByText(/No exercises added yet/)).toBeInTheDocument()
  })

  it('renders list of exercises', () => {
    renderWithContext()
    expect(screen.getByText('Bench Press')).toBeInTheDocument()
    expect(screen.getByText('Squat')).toBeInTheDocument()
    expect(screen.getByText('2 warmup sets')).toBeInTheDocument()
    expect(screen.getByText('3 working sets')).toBeInTheDocument()
  })

  it('handles delete exercise', () => {
    renderWithContext()
    const deleteButtons = screen.getAllByLabelText('delete exercise')
    fireEvent.click(deleteButtons[0])

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_EXERCISE',
      payload: '1'
    })
  })

  it('handles edit exercise', () => {
    renderWithContext()
    const editButtons = screen.getAllByLabelText('edit exercise')
    fireEvent.click(editButtons[0])

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SELECT_EXERCISE',
      payload: mockExercises[0]
    })
  })

  it('displays exercise notes when available', () => {
    renderWithContext()
    expect(screen.getByText('Keep tight form')).toBeInTheDocument()
    expect(screen.getByText('Focus on depth')).toBeInTheDocument()
  })
})
