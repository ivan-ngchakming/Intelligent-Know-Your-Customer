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
              <TableRow>
                <TableCell><Link to="/current-acct">Current Account</Link></TableCell>
                <TableCell>012-123-31-123333</TableCell>
                <TableCell>HK $10,123.21</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Link to="/savings-acct">Savings Account</Link></TableCell>
                <TableCell>012-123-31-123334</TableCell>
                <TableCell>HK $50,123.21</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}
