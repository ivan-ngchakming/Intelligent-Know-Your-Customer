import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState, useEffect } from 'react';

const formatDatetime = (dateTime) => {
  if (dateTime)
    return dateTime.split('T').join(' ')
  return ''
}

export default function LoginHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    window.server.auth.login_history(
      JSON.stringify({
        user_id: userId,
      })
    ).then(res => {
      res = JSON.parse(res)
      setRows(res);
    })

  }, [])

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
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                >
                  <TableCell>{formatDatetime(row.login_date)}</TableCell>
                  <TableCell>{formatDatetime(row.logout_date)}</TableCell>
                  <TableCell>{row.confidence}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
