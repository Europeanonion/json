import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'

export function renderWithProviders(ui: ReactElement) {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  )
}