import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WorkoutCard } from '../WorkoutCard'

describe('WorkoutCard', () => {
  const mockExercise = {
    name: 'Bench Press',
    warmupSets: '2',
    workingSets: '3',
    reps: '8-12',
    rpe: '8',
    rest: '2-3 min',
    substitutions: ['DB Press', 'Machine Press'],
    notes: 'Keep tight form'
  }

  describe('Display Tests', () => {
    it('renders all basic exercise information', () => {
      render(<WorkoutCard exercise={mockExercise} />)
      expect(screen.getByText('Bench Press')).toBeInTheDocument()
      expect(screen.getByText('3 sets')).toBeInTheDocument()
      expect(screen.getByText('8-12 reps')).toBeInTheDocument()
      expect(screen.getByText('RPE 8')).toBeInTheDocument()
    })

    it('shows warmup sets information', () => {
      render(<WorkoutCard exercise={mockExercise} />)
      expect(screen.getByText('2 warmup sets')).toBeInTheDocument()
    })
  })

  describe('Interaction Tests', () => {
    it('toggles content visibility on button click', () => {
      render(<WorkoutCard exercise={mockExercise} />)
      
      // Initially, details should be hidden
      expect(screen.queryByText('Rest: 2-3 min')).not.toBeInTheDocument()
      
      // Click to expand
      const expandButton = screen.getByTestId('expand-button')
      fireEvent.click(expandButton)
      
      // Details should be visible
      expect(screen.getByText('Rest: 2-3 min')).toBeInTheDocument()
      expect(screen.getByText('Keep tight form')).toBeInTheDocument()
      
      // Click to collapse
      fireEvent.click(expandButton)
      
      // Details should be hidden again
      expect(screen.queryByText('Rest: 2-3 min')).not.toBeInTheDocument()
    })
  })
})