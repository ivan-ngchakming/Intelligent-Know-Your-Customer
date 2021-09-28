import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

function createData(loginDate, logoutDate, confidence) {
  return { loginDate, logoutDate, confidence };
}

const rows = [
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
  createData('2021-09-30', '2021-09-30', 60),
];

export default function LoginHistory() {
  return (
    <>
      <Container size='md' sx={{ mt: 8 }}>
        <TableContainer component={Paper}>
          <Table aria-label="login history table">
            <TableHead>
              <TableRow>
                <TableCell>Login Date</TableCell>
                <TableCell>Logout Date</TableCell>
                <TableCell>Confidence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                >
                  <TableCell>{row.loginDate}</TableCell>
                  <TableCell>{row.logoutDate}</TableCell>
                  <TableCell>{row.confidence}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
