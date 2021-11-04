import React, { useState } from 'react';
import {
  Grid, TextField, Button, Box
} from '@mui/material';
import ValidationDialog from '../../components/ValidationDialog';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function AccountFilterForm({updateRows, currency_symbol}) {
  const [validationMsg, setValidationMsg] = useState(null);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [showBtn, setShowBtn] = useState(false); // for showing clear filters button

  const handleFilterClick = () => {
    const [errorMsg, inputs] = checkFilters()
    if (errorMsg.length !== 0) {
      setValidationMsg(errorMsg)
      setOpen(true)
      return
    }
    if (Object.values(inputs).some(v => v!==null)) { // do nothing if no values entered
      updateRows(inputs)
      setShowBtn(true)
    }
  }

  const handleClearFilters = () => {
    updateRows({})
    setShowBtn(false)
    setMinAmount('');
    setMaxAmount('');
    setStartDate(null);
    setEndDate(null);
  }

  // checks if inputs for filters are valid
  const checkFilters = () => {
    var errorMsg = []
    var inputs = {}

    if (startDate) {
      const dateObj = new Date(startDate)
      if (isValidDate(dateObj)) {
        const dateString = dateObj.toLocaleString("sv-SE")
        inputs.start_date = dateString.slice(0, -2) + "00"
        console.log(inputs)
      } else {
        errorMsg.push('Enter a valid Start Date & Time')
      }
    } else {
      inputs.start_date = null
    }

    if (endDate) {
      const dateObj = new Date(endDate)
      if (isValidDate(dateObj)) {
        const dateString = dateObj.toLocaleString("sv-SE")
        inputs.end_date = dateString.slice(0, -2) + "59"
        console.log(inputs)
      } else {
        errorMsg.push('Enter a valid End Date & Time')
      }
    } else {
      inputs.end_date = null
    }

    if (minAmount) {
      if (isNaN(minAmount))
        errorMsg.push('Enter a valid Minimum Amount')
      else
        inputs.min_amount = Number(minAmount)
    } else {
      inputs.min_amount = null
    }

    if (maxAmount) {
      if (isNaN(maxAmount))
        errorMsg.push('Enter a valid Maximum Amount')
      else
        inputs.max_amount = Number(maxAmount)
    } else {
      inputs.max_amount = null
    }

    if (inputs.start_date && inputs.end_date) {
      if (inputs.start_date > inputs.end_date)
        errorMsg.push('Start Date cannot be after End Date')
    }
    if (inputs.min_amount && inputs.max_amount) {
      if (inputs.min_amount > inputs.max_amount)
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
            label={"Min Amount (" + currency_symbol + ")"}
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
            label={"Max Amount (" + currency_symbol + ")"}
            value={maxAmount}
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
          { showBtn ?
            <Box mr={1}>
              <Button onClick={handleClearFilters} variant='contained' mr={5}>Clear Filters</Button>
            </Box> : null
          }
          <Button onClick={handleFilterClick} variant='contained'>Filter</Button>
        </Grid>
      </Grid>
      </LocalizationProvider>
      <ValidationDialog open={open} msg={validationMsg} handleClose={()=>{setOpen(false)}} />
    </>
  );
}
