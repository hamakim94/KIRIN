import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material/';

function NewLoading() {
  return (
    <Backdrop sx={{ color: '#ffffff', zIndex: 'tooltip' }} open={true}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

export default NewLoading;
