import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BottomAppBar from './components/ButtomAppBar';
import Login from './views/Login';
import Home from './views/Home';
import LoginHistory from './views/LoginHistory';
import Transactions from './views/Transactions';
import AccountDetail from './views/AccountDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f07260',
      contrastText: 'white',
    },
    secondary: {
      main: '#9C89B8',
    }
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
              <Route path="/transactions" exact component={Transactions} />
              <Route path="/account" exact render={(props) => <AccountDetail {...props}/>} />
            </BottomAppBar>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
