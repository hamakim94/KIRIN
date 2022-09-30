import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Context from '../../utils/Context';
import { AiOutlineHome, AiFillPlusCircle } from 'react-icons/ai';
import { MdGrass } from 'react-icons/md';
import { BiBookHeart, BiDonateHeart } from 'react-icons/bi';
import { IoPersonCircleOutline } from 'react-icons/io5';

function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const [path, setPath] = useState(null);
  const { selected, setSelected } = useContext(Context);
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
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
            fontSize: 28,
          }}
        >
          <BottomNavigationAction icon={<AiOutlineHome />} LinkComponent={Link} to='/' />
          <BottomNavigationAction icon={<MdGrass />} LinkComponent={Link} to='/savana' />
          <BottomNavigationAction
            icon={<AiFillPlusCircle />}
            LinkComponent={Link}
            to={selected ? '/plus' : '/select'}
          />
          <BottomNavigationAction icon={<BiDonateHeart />} LinkComponent={Link} to='/donation' />
          <BottomNavigationAction
            icon={<IoPersonCircleOutline />}
            LinkComponent={Link}
            to='/mypage'
          />
        </BottomNavigation>
      </Box>
    );
  }
}

export default SimpleBottomNavigation;
