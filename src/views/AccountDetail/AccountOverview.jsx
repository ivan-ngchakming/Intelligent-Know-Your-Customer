import React from 'react';
import { Grid, Box } from '@mui/material';

// TODO: API for getting account info using accountNum

export default function AccountOverview({accountNum}) {
  return (
    <>
      <Grid container columnSpacing={3} sx={{ mb:3, textAlign: 'center', color:'primary.contrastText', fontWeight:'bold'}}>
        <Grid item xs={4}>
          <Box sx={{ boxShadow: 0, bgcolor: 'primary.main', borderRadius: '8px', py:1.5 }}>
            Account Number: {accountNum}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ boxShadow: 0, bgcolor: 'primary.main', borderRadius: '8px', py:1.5 }}>
            Balance: HK$10,123.21
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ boxShadow: 0, bgcolor: 'primary.main', borderRadius: '8px', py:1.5 }}>
            Currency: HKD
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
