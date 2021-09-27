import React from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LogoutIcon from '@mui/icons-material/Logout';

const routes = [
  '/home',
  '/',
]

export default function BottomAppBar({children, onChange}) {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const toUrl = routes[newValue];
    if (toUrl) {
      console.log("Redirecting to " + toUrl)
      history.push(toUrl)
    }
  }

  return (
    <>
      {children}
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Logout" icon={<LogoutIcon />} />
        </BottomNavigation>
      </AppBar>
    </>
  );
}
