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
    flex: 0.4,
  },
  {
    field: 'time',
    headerName: 'Time',
    sortable: false,
    flex: 0.4,
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
    valueFormatter: (params) => {
      return params.value.toFixed(2)
    },
  },
  {
    field: 'balance',
    headerName: 'Balance',
    sortable: false,
    flex: 0.4,
    valueFormatter: (params) => {
      return params.value.toFixed(2)
    },
  },
];

const Footer = ({currency}) => {
  return (
    <div style={{marginLeft: '15px'}}>
      <p>Note: Transaction amount and account balance are in {currency}</p>
    </div>
  )
};

export default function AccountDetail(props) {
  const { accountNum, accountType } = props.location.state;
  const [accountInfo, setAccountInfo] = useState({})
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows([]) // it only works if i add this or resize the window whhHyYY
    updateRows({})
    getAccountInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // update transaction records
  const updateRows = (filters) => {
    filters.account_num = accountNum
    window.server.transactions.list_transactions(
      JSON.stringify(filters)
    ).then(res => {
      const records = JSON.parse(res)
      console.log('returned from api:', records)
      setRows(records)
    })
  }

  // get account balance, currency and symbol
  const getAccountInfo = () => {
    window.server.accounts.get_account(
      JSON.stringify({
        accountNum: accountNum,
      })
    ).then(res => {
      const result = JSON.parse(res)
      console.log('account information', result)
      setAccountInfo(
        {currency: result.currency, balance: result.balance, currency_symbol: result.currency_symbol}
      )
    })
  }

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 5 }}>
        {accountType} Account
      </Typography>

      <Container size='md' sx={{ mt:4 }}>
        <AccountOverview
          accountNum={accountNum} balance={accountInfo.balance}
          currency={accountInfo.currency} currency_symbol={accountInfo.currency_symbol}
        />
        <AccountFilterForm updateRows={updateRows} currency_symbol={accountInfo.currency_symbol}/>

        {/* transaction records */}
        <DataGrid
          columns={columns} rows={rows} density="compact"
          pageSize={5}
          autoHeight 
          autoPageSize 
          disableColumnMenu
          disableSelectionOnClick
          components={{
            Footer: Footer,
          }}
          componentsProps={{
            footer: { currency: accountInfo.currency },
          }}
        />
      </Container>
    </>
  );
}
