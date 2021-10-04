import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import FaceId from './FaceId';
import User from './User';

export default function Login() {
  const [userId, setUserId] = useState(null); 

  const handleLogin = (userId) => {
    setUserId(userId)
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
          {userId ? (
            <FaceId userId={userId} />
          ):(
            <User onLogin={handleLogin}/>
          )}
        </Box>
      </Container>
    </>
  )
}
