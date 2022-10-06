import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material/';

function Loading(props) {
  return (
    <Backdrop sx={{ color: '#fff' }} open={props.loading}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

export default Loading;
