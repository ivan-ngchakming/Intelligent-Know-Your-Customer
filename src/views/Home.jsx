import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const accounts = [
  {type: 'Current', account_number: '012-123-31-123333', balance: 10123.21, currency: 'HKD'},
  {type: 'Savings', account_number: '012-123-31-123334', balance: 50123.21, currency: 'HKD'},
]

export default function Home() {
  // TODO: get actual account records from API
  return (
    <div>
      <Typography variant="h4" sx={{textAlign: 'center', marginTop: 8}}>
        Welcome Back, Doge
      </Typography>
      <Container size='md' sx={{ mt: 8 }}>
        <TableContainer component={Paper}>
          <Table aria-label="accounts-table">
            <TableHead>
              <TableRow>
                <TableCell>Account Type</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map(account => (
                <TableRow>
                  <TableCell>
                    <Link to={{
                      pathname: "/account",
                      state: { accountNum: account.account_number, accountType: account.type },
                    }}>{account.type} Account</Link>
                  </TableCell>
                  <TableCell>{account.account_number}</TableCell>
                  <TableCell>HK ${account.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}
