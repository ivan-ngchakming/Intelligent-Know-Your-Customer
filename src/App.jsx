import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BottomAppBar from './components/ButtomAppBar';
import Login from './views/Login';
import Home from './views/Home';
import LoginHistory from './views/LoginHistory';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f07260',
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            
            <BottomAppBar>
              <Route path="/home" exact component={Home} />
              <Route path="/login-history" exact component={LoginHistory} />
            </BottomAppBar>
            
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
