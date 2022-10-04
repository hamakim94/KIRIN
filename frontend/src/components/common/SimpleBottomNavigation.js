import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  useEffect(() => {
    const pathname = location.pathname.split('/');
    setPath(pathname[1]);
    switch (pathname[1]) {
      case '':
        setValue(0);
        break;
      case 'savana':
        setValue(1);
        break;
      case 'plus':
        setValue(2);
        break;
      case 'select':
        setValue(2);
        break;
      case 'register':
        setValue(2);
        break;
      case 'donation':
        setValue(3);
        break;
      case 'mypage':
        setValue(4);
        break;
    }
    if (!(pathname[1] === 'savana' || pathname[1] === 'challenge')) {
      setSelected(0);
    }
  }, [location]);
  if (path && path === 'plus') {
    return null;
  } else if (path || path === '') {
    return (
      <Box
        sx={{
          position: 'fixed',
          width: '100vw',
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
          <BottomNavigationAction icon={<MdGrass />} LinkComponent={Link} to='/savana/0' />
          <BottomNavigationAction
            icon={<AiFillPlusCircle size={28} />}
            LinkComponent={Link}
            // to={`/plus/${selected}`}
            onClick={() => navigate(`/plus/${selected}`)}
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
