import React from 'react';
import {
  Typography, Container
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AccountOverview from './AccountOverview';
import AccountFilterForm from './AccountFilterForm';

export default function AccountDetail({AccountType}) {
  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      filterable: false,
      flex: 0.3,
    },
    {
      field: 'time',
      headerName: 'Time',
      sortable: false,
      flex: 0.3,
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: false,
      flex: 1,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.4,
    },
    {
      field: 'balance',
      headerName: 'Balance',
      sortable: false,
      flex: 0.4,
    },
  ];

  const rows = [ // TODO: get actual data from API
    { id:1,  date: '2021-03-02', time: '10:21AM', description: 'somedescription', amount:'100', balance: 200},
    { id:2,  date: '2017-03-02', time: '9:21PM', description: 'somedescription', amount:'-200', balance: 200},
    { id:3,  date: '2021-02-02', time: '10:21AM', description: 'somedescription', amount:'10', balance: 200},
    { id:4,  date: '2021-09-02', time: '10:21AM', description: 'somedescription', amount:'2000', balance: 200},
    { id:5,  date: '2019-03-31', time: '10:21AM', description: 'somedescription', amount:100, balance: 200},
    { id:6,  date: '2021-03-02', time: '10:21AM', description: 'somedescription', amount:100, balance: 200},
  ];

  /* TODO: get account num using account type + userId */
  const accountNum = '012-123-123231';

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 8 }}>
        {AccountType} Account
      </Typography>

      <Container size='md' sx={{ mt:4 }}>
        <AccountOverview accountNum={accountNum} />
        <AccountFilterForm />
        
        {/* transaction records */}
        <DataGrid
          columns={columns} rows={rows} density="compact"
          pageSize={5}
          autoHeight autoPageSize disableColumnMenu
        />
      </Container>
    </>
  );
}
