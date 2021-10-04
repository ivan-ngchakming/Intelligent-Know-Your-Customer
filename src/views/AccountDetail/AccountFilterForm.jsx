import React, { useState } from 'react';
import {
  Grid, TextField, InputAdornment, Button,
} from '@mui/material';

// TODO: form validation and API for filtering

export default function AccountFilterForm() {
  const [values, setValues] = useState({
    minAmount: null,
    maxAmount: null,
    fromDate: null,
    toDate: null,
    fromTime: null,
    toTime: null
  })

  const handleFilter = () => {
    // TODO: send request to API with 'values'
    // TODO: add a 'clear filters' button?
    console.log(values)
  }

  const handleValueChange = (prop) => (event) => {
    console.log(prop)
    setValues({...values, [prop]: event.target.value });
  };

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={4} sx={{ mt: 3, mb:3 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth label="Min Amount"
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{startAdornment: (<InputAdornment>$</InputAdornment>)}}
            onChange={handleValueChange('minAmount')}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="From"
            size="small" type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleValueChange('fromDate')}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="From"
            size="small" type="time"
            InputLabelProps={{ shrink: true }}
            onChange={handleValueChange('fromTime')}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="Max Amount"
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{startAdornment: (<InputAdornment>$</InputAdornment>)}}
            onChange={handleValueChange('maxAmount')}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="To"
            size="small" type="date"
            InputLabelProps={{ shrink: true }}
            onChange={handleValueChange('toDate')}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="To"
            size="small" type="time"
            InputLabelProps={{ shrink: true }}
            onChange={handleValueChange('toTime')}
          />
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='flex-end'>
          <Button id="filter-btn" onClick={handleFilter} variant='contained'>
            Filter
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
