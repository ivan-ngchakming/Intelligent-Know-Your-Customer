import React from 'react';
import { Grid, Box } from '@mui/material';

export default function AccountOverview({accountNum, balance, currency, currency_symbol}) {
  return (
    <>
      <Grid container columnSpacing={3} sx={{ mb:3, textAlign: 'center', color:'primary.contrastText', fontWeight:'bold'}}>
        <Grid item xs={4}>
          <Box sx={{ boxShadow: 2, bgcolor: 'primary.main', borderRadius: '8px', py:1.5 }}>
            Account Number: {accountNum}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ boxShadow: 2, bgcolor: 'primary.main', borderRadius: '8px', py:1.5 }}>
            Balance: {currency_symbol + balance}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ boxShadow: 2, bgcolor: 'primary.main', borderRadius: '8px', py:1.5 }}>
            Currency: {currency}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
