import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ValidationDialog from '../../components/ValidationDialog';

export default function User({onLogin}) {
  const [userName, setUserName] = useState('');
  const [validationMsg, setValidationMsg] = useState(null);
  const [open, setOpen] = useState('');

  const handleLogin = () => {
    // get user id from username from api
    var error = false;
    var errorMsg = [];
    const userId = 1

    if (userName === '') {
      errorMsg.push("Please enter username")
      error = true
    }

    if (error) {
      setValidationMsg(errorMsg)
      handleDialogOpen();
    } else {
      onLogin(userId);
    }
    
  }

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <PersonIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Enter your User Name
      </Typography>

      <Box sx={{ mt: 4 }}>
        <TextField 
          id="user-name" 
          label="User Name" 
          variant="outlined" 
          value={userName}
          onChange={(event, newValue) => setUserName(newValue)}
        />
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>

      <ValidationDialog open={open} msg={validationMsg} handleClose={handleDialogClose} />
    </>
  )
}
