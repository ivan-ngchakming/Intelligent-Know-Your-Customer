import React from 'react';
import {
  Grid, TextField, InputAdornment, Button,
} from '@mui/material';

// TODO: form validation and API for filtering

export default function AccountFilterForm() {
  const handleFilter = () => {
    console.log('TODO: send request to API');
    // TODO: add a 'clear filters' button?
  }

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={4} sx={{ mt: 3, mb:3 }}>
        <Grid item xs={4}>
          <TextField
            fullWidth label="Min Amount"
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{startAdornment: (<InputAdornment>$</InputAdornment>)}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="From"
            size="small" type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="From"
            size="small" type="time"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="Max Amount"
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{startAdornment: (<InputAdornment>$</InputAdornment>)}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="To"
            size="small" type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth label="To"
            size="small" type="time"
            InputLabelProps={{ shrink: true }}
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
