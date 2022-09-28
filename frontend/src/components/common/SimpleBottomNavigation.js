import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Context from '../../utils/Context';
function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const [path, setPath] = useState(null);
  const { selected, setSelected } = useContext(Context);
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
    console.log(location);
  }, [location]);
  if (path && path === '/plus') {
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
          borderTopStyle: 'solid',
          borderTopWidth: 0.1,
          borderTopColor: '#C9C9C9',
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
          <BottomNavigationAction
            label='플러스'
            LinkComponent={Link}
            to={selected ? '/plus' : '/select'}
          />
          <BottomNavigationAction label='기부' LinkComponent={Link} to='/donation' />
          <BottomNavigationAction label='마이' LinkComponent={Link} to='/mypage' />
        </BottomNavigation>
      </Box>
    );
  }
}

export default SimpleBottomNavigation;
