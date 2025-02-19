import { Box, Container } from '@mui/material';
import { Navigation } from './Navigation';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <Box sx={{ pb: 7 }}>
    <Container maxWidth="sm">
      {children}
    </Container>
    <Navigation />
  </Box>
);