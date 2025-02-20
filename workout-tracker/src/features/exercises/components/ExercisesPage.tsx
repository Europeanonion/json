
import React from 'react'
import { Box } from '@mui/material'
import { ExerciseForm } from './ExerciseForm'
import { ExerciseList } from './ExerciseList'

export const ExercisesPage: React.FC = () => {
  return (
    <Box>
      <ExerciseForm />
      <ExerciseList />
    </Box>
  )
}
