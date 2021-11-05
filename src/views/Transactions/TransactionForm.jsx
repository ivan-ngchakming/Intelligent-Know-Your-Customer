import {
  Box, Button, FormControl, InputAdornment, InputLabel,
  MenuItem, OutlinedInput, Select, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

function renderAccount(account) {
  return `${account.account_num} - ${account.account_type} (${account.currency}) - balance: ${account.currency_symbol}${account.balance}`
}

export default function TransactionForm({onSubmit, mode}) {
  const [userAccounts, setUserAccounts] = useState(null);
  const [values, setValues] = React.useState({
    from: '',
    to: '',
    amount: 0,
    description: '',
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
      console.log('user accounts:', data);
      setUserAccounts(data);
    })
  };

  useEffect(() => {
    fetchAccounts(userId);
  }, [userId]);

  return (
    <Box>
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
      {mode === 'payment' ? (
        <FormControl fullWidth sx={{mt: 2}}>
          <TextField id="to-account" type='number' label="To" variant="outlined" onChange={handleValueChange('to')}/>
        </FormControl>
      ) : (
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
      )}
      <FormControl fullWidth sx={{mt: 2}}>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <OutlinedInput
          id="amount"
          label="Amount"
          variant="outlined"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={handleValueChange('amount')}
          type='number'
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>

      <FormControl fullWidth sx={{mt: 2}}>
        <InputLabel htmlFor="description">Description</InputLabel>
        <OutlinedInput
        id="description"
        label="Description"
        variant="outlined"
        onChange={handleValueChange('description')}
      />
      </FormControl>

      <Box display='flex' justifyContent='flex-end' mt={5} mr={0}>
        <Button onClick={handleSubmit} variant='contained'>
          Submit
        </Button>
      </Box>

    </Box>
  )
}
