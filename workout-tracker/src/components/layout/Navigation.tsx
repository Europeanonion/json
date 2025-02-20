import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Workout Tracker
        </Typography>
        <Box component="nav">
          <Button
            component={RouterLink}
            to="/workouts"
            color="inherit"
          >
            Workouts
          </Button>
          <Button
            component={RouterLink}
            to="/exercises"
            color="inherit"
          >
            Exercises
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}