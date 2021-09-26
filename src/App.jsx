import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './views/Login';
import Home from './views/Home';

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
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
