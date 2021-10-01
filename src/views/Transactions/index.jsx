import React, { useState } from 'react';
import {
  Box, Container, Tab, Tabs
} from '@mui/material';
import TransactionForm from './TransactionForm';
import ValidationDialog from './ValidationDialog';
import TabPanel from '../../components/TabPanel';
import { a11yProps } from './utils';



export default function Transactions() {
  const [tab, setTab] = useState(0);
  const [validationMsg, setValidationMsg] = useState(null);
  const [open, setOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const onSubmit = (values) => {
    values.to = Number(values.to)
    values.from = Number(values.from)
    values.amount = Number(values.amount)

    console.log(`values`, values)

    var error = false;
    var errorMsg = [];

    if (values.from === 0) {
      error = true;
      errorMsg.push('From account cannot be empty')
    }
    if (values.to === 0) {
      error = true;
      errorMsg.push('To account cannot be empty')
    }
    if (values.amount <= 0) {
      error = true;
      errorMsg.push('Amount must be a positive number')
    }
    if (values.from === values.to) {
      error = true;
      errorMsg.push('From account and To account must be different')
    }

    if (error) {
      setValidationMsg(errorMsg);
      handleDialogOpen();
    }
  }

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container size='md' sx={{ mt: 8 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleTabChange} aria-label="transaction-tabs">
            <Tab label="Make a Payment" {...a11yProps('transactions', 0)} />
            <Tab label="Make a Transfer" {...a11yProps('transactions', 1)} />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}>
          <TransactionForm onSubmit={onSubmit} mode='payment' />
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <TransactionForm onSubmit={onSubmit} mode='transfer' />
        </TabPanel>

      </Container>

      <ValidationDialog open={open} msg={validationMsg} handleClose={handleDialogClose} />
    </>
  )
}
