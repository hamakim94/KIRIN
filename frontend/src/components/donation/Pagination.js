import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Pagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} size="small" />
    </Stack>
  );
}

export default Pagination;
