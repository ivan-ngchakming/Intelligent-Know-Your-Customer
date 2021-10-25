import {
  Box, Button, FormControl, InputAdornment, InputLabel,
  MenuItem, OutlinedInput, Select, TextField,
  // Tooltip
} from '@mui/material';
import React, { useEffect, useState } from 'react';

function renderAccount(account) {
  return `${account.account_num} - ${account.account_type} - balance: $${account.balance}`
}

export default function TransactionForm({onSubmit, mode}) {
  const [userAccounts, setUserAccounts] = useState(null);
  const [values, setValues] = React.useState({
    from: '',
    to: '',
    amount: 0,
  });

  const userId = localStorage.getItem('userId');

  const handleValueChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    onSubmit(values)
  }

  const fetchAccounts = (userId) => {
    window.server.accounts.list_accounts(
      JSON.stringify({
        userId: userId,
      })
    ).then(res => {
      const data = JSON.parse(res);
      console.log(data);
      setUserAccounts(data);
    })
  };

  useEffect(() => {
    fetchAccounts(userId);
  }, [userId]);

  return (
    <>
      <Box>
        {/* <Tooltip title="Select account to transfer fund from" placement="bottom-start"> */}
          <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel id="from-account-select-label">From</InputLabel>
            <Select
              labelId="from-account-select-label"
              id="from-account-select"
              value={values.from}
              label="From"
              onChange={handleValueChange('from')}
            >
              {userAccounts && userAccounts.map(account => (
                <MenuItem 
                    key={`account-option-${account.account_num}`}
                    value={account.account_num}
                  >
                  {renderAccount(account)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        {/* </Tooltip> */}
        {mode === 'payment' ? (
          // <Tooltip title="Enter account number of account to transfer payment to" placement="bottom-start">
            <FormControl fullWidth sx={{mt: 2}}>
              <TextField id="to-account" label="To" variant="outlined" onChange={handleValueChange('to')}/>
            </FormControl>
          // </Tooltip>
        ) : (
          // <Tooltip title="Select to transfer fund to" placement="bottom-start">
            <FormControl fullWidth sx={{mt: 2}}>
              <InputLabel id="to-account-select-label">To</InputLabel>
              <Select
                labelId="to-account-select-label"
                id="to-account-select"
                value={values.to}
                label="To"
                onChange={handleValueChange('to')}
              >
                {userAccounts && userAccounts.map(account => (
                  <MenuItem value={account.account_num}>{renderAccount(account)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          // </Tooltip>
        )}

        {/* <Tooltip title="Enter amount of fund to be transferred" placement="bottom-start"> */}
          <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
            id="amount"
            label="Amount"
            variant="outlined"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={handleValueChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          </FormControl>
        {/* </Tooltip> */}
        
        <Box display='flex' justifyContent='flex-end' mt={5} mr={0}>
          <Button onClick={handleSubmit} variant='contained'>
            Submit
          </Button>
        </Box>

      </Box>
    </>
  )
}
