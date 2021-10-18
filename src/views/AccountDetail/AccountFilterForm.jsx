import React, { useState } from 'react';
import {
  Grid, TextField, Button,
} from '@mui/material';
import ValidationDialog from '../../components/ValidationDialog';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function AccountFilterForm() {
  const [validationMsg, setValidationMsg] = useState(null);
  const [open, setOpen] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  // TODO: add clear filters button

  const handleFilter = () => {
    const [errorMsg, inputs] = checkInputs()
    if (Object.keys(inputs).some(v=>v)) { // do nothing if no values entered
      if (errorMsg.length !== 0) {
        setValidationMsg(errorMsg)
        setOpen(true)
      } else {
        console.log('TODO: send api request')
      }
    }
  }

  // checks if inputs are valid
  const checkInputs = () => {
    var errorMsg = []
    var inputs = {}

    if (startDate) {
      const dateVal = new Date(startDate)
      if (isValidDate(dateVal))
        inputs.startDate = dateVal
      else
        errorMsg.push('Enter a valid Start Date & Time')
    } else {
      inputs.startDate = null
    }

    if (endDate) {
      const dateVal = new Date(endDate)
      if (isValidDate(dateVal))
        inputs.endDate = dateVal
      else
        errorMsg.push('Enter a valid End Date & Time')
    } else {
      inputs.endDate = null
    }

    if (minAmount) {
      if (isNaN(minAmount))
        errorMsg.push('Enter a valid Minimum Amount')
      else
        inputs.minAmount = Number(minAmount)
    } else {
      inputs.minAmount = null
    }

    if (maxAmount) {
      if (isNaN(maxAmount))
        errorMsg.push('Enter a valid Maximum Amount')
      else
        inputs.maxAmount = Number(maxAmount)
    } else {
      inputs.maxAmount = null
    }

    if (inputs.startDate && inputs.endDate) {
      if (inputs.startDate > inputs.endDate)
        errorMsg.push('Start Date cannot be after End Date')
    }
    if (inputs.minAmount && inputs.maxAmount) {
      if (inputs.minAmount > inputs.maxAmount)
        errorMsg.push('Min Amount cannot be greater than Max Amount')
    }
    return [errorMsg, inputs]
  }

  const isValidDate = (date) => {
    return (date instanceof Date && !isNaN(date.valueOf()))
  }

  return (
    <>
     <LocalizationProvider dateAdapter={DateAdapter}>
      <Grid container rowSpacing={2} columnSpacing={4} sx={{ mt: 3, mb:3 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth size="small"
            label="Min Amount ($)"
            value={minAmount}
            onChange={(event) => {setMinAmount(event.target.value);}}
          />
        </Grid>
        <Grid item xs={6}>
          <DateTimePicker
            label="Start Date & Time"
            value={startDate}
            onChange={(newValue) => {setStartDate(newValue);}}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth size="small"
            label="Max Amount ($)"
            onChange={(event) => {setMaxAmount(event.target.value);}}
          />
        </Grid>
        <Grid item xs={6}>
          <DateTimePicker
            label="End Date & Time"
            value={endDate}
            onChange={(newValue) => {setEndDate(newValue);}}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='flex-end'>
          <Button id="filter-btn" onClick={handleFilter} variant='contained'>
            Filter
          </Button>
        </Grid>
      </Grid>
      </LocalizationProvider>
      <ValidationDialog open={open} msg={validationMsg} handleClose={()=>{setOpen(false)}} />
    </>
  );
}
