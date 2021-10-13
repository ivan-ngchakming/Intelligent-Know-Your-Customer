import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import FaceId from './FaceId';
import User from './User';

export default function Login() {
  const [user, setUser] = useState(null); 

  const handleLogin = (user) => {
    setUser(user);
  }

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {user ? (
            <FaceId user={user} />
          ):(
            <User onLogin={handleLogin}/>
          )}
        </Box>
      </Container>
    </>
  )
}
