import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const [path, setPath] = useState(null);
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);
  if (path && (path === '/plus' || path === '/preview')) {
    return null;
  } else if (path) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 55,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            '& .Mui-selected, .Mui-selected > svg': {
              color: '#FFC947',
            },
          }}
        >
          <BottomNavigationAction label='홈' LinkComponent={Link} to='/' />
          <BottomNavigationAction label='사바나' LinkComponent={Link} to='/savana' />
          <BottomNavigationAction label='플러스' LinkComponent={Link} to='/plus' />
          <BottomNavigationAction label='기부' LinkComponent={Link} to='/donation' />
          <BottomNavigationAction label='마이' LinkComponent={Link} to='/mypage' />
        </BottomNavigation>
      </Box>
    );
  }
}

export default SimpleBottomNavigation;
