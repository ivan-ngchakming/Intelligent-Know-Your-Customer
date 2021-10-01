import React from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';

const routes = [
  {path: '/home', label: 'Home', icon: HomeIcon},
  {path: '/transactions', label: 'New Transaction', icon: PaymentsIcon},
  {path: '/login-history', label: 'Login History', icon: HistoryIcon},
  {path: '/', label: 'Logout', icon: LogoutIcon},
]

export default function BottomAppBar({children, onChange}) {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const path = routes[newValue].path;
    if (path) {
      if (path === '/') {
        // Logout
        localStorage.removeItem('userId');
      }
      console.log("Redirecting to " + path)
      history.push(path)
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
          {routes.map(route => (
            <BottomNavigationAction key={`app-bar-${route.path}-action`} label={route.label} icon={<route.icon />} />
          ))}
        </BottomNavigation>
      </AppBar>
    </>
  );
}
