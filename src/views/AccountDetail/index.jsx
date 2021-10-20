import React, { useState, useEffect } from 'react';
import {
  Typography, Container
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AccountOverview from './AccountOverview';
import AccountFilterForm from './AccountFilterForm';

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

//const poop = [{id:1, description:'pooooop'}, {id:2, description:'fml'}]

export default function AccountDetail(props) {
  const { accountNum, accountType } = props.location.state;
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows([]) // SEND HELP it only works if i add this or resize the window whhHyYY
    updateRows({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // update transaction records
  const updateRows = (filters) => {
    filters.accountNum = accountNum
    window.server.transactions.list_transactions(
      JSON.stringify(filters)
    ).then(res => {
      const records = JSON.parse(res)
      console.log('returned from api:', records)
      setRows(records)
    })
  }

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 5 }}>
        {accountType} Account
      </Typography>

      <Container size='md' sx={{ mt:4 }}>
        <AccountOverview accountNum={accountNum} />
        <AccountFilterForm updateRows={updateRows}/>

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
