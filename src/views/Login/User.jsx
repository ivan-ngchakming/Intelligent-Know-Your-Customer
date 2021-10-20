import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ValidationDialog from '../../components/ValidationDialog';

export default function User({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [validationMsg, setValidationMsg] = useState(null);
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    // get user id from username from api
    var error = false;
    var errorMsg = [];

    if (userName === '') {
      errorMsg.push("Please enter username")
      error = true
    }

    if (error) {
      setValidationMsg(errorMsg)
      handleDialogOpen();
    } else {
      console.log("Getting user by name: " + userName);
      window.server.user.get_user(userName).then(res => {
        if (res === 'no results') {
          errorMsg = ["Sorry, username not found"];
          setValidationMsg(errorMsg)
          handleDialogOpen();
          return;
        }
        const user = JSON.parse(res)
        onLogin(user);
      })
    }
  }

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleUserNameChange = (event) => setUserName(event.target.value);
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
          onChange={handleUserNameChange}
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
