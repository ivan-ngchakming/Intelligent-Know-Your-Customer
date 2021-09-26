import React from 'react';
import { Box, Button, Container } from '@mui/material';


export default function Login() {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box>
          <Button href="/home" variant="contained" sx={{marginLeft: '10px'}}>
            Login
          </Button>
        </Box>
      </Container>

    </>
  )
}
