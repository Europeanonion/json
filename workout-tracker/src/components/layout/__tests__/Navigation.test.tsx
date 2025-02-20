import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Navigation } from '../Navigation'
import { renderWithProviders } from '../../../test/test-utils'

describe('Navigation', () => {
  it('renders navigation component', () => {
    renderWithProviders(<Navigation />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('displays navigation links', () => {
    renderWithProviders(<Navigation />)
    
    const workoutsLink = screen.getByRole('link', { name: /workouts/i })
    const exercisesLink = screen.getByRole('link', { name: /exercises/i })
    
    expect(workoutsLink).toHaveAttribute('href', '/workouts')
    expect(exercisesLink).toHaveAttribute('href', '/exercises')
  })
})