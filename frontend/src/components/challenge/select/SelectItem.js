import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../../common/ProfileImg';
import { BsPlayCircle, BsStopCircle, BsStopCircleFill } from 'react-icons/bs';
import { IconButton } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFC947',
    },
    secondary: {
      main: '#808080',
    },
  },
  typography: {
    fontFamily: 'SCD400',
  },
});

function SelectItem(props) {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const handleClick = () => {
    if (props.audioRef.current) {
      props.audioRef.current.pause();
    }
    if (props.checkRef.current === props.index) {
      if (playing) {
        props.audioRef.current.pause();
        setPlaying(false);
      } else {
        props.audioRef.current.volume = 0.1;
        props.audioRef.current.play();
        setPlaying(true);
      }
    } else {
      props.audioRef.current = new Audio(`/files/${props.item.music}`);
      props.audioRef.current.volume = 0.1;
      props.audioRef.current.play();
      setPlaying(true);
    }
    if (props.prevRef.current && props.checkRef.current !== props.index) {
      props.prevRef.current(false);
    }
    props.checkRef.current = props.index;
    props.prevRef.current = setPlaying;
  };
  return (
    <ThemeProvider theme={theme}>
      <div id={props.styles.listWrapper}>
        <div
          className={props.styles.leftWrapper}
          onClick={() => navigate(`/plus/${props.item.challengeId}`)}
        >
          <ProfileImg src={props.item.profile} size={'50px'} />
          <div className={props.styles.midWrapper}>
            <div className={props.styles.topText}>{props.item.title}</div>
            <div className={props.styles.botText}>
              {props.item.star} - {props.item.musicTitle}
            </div>
          </div>
        </div>
        <div className={props.styles.rightWrapper}>
          {playing ? (
            <IconButton
              color='secondary'
              aria-label='upload picture'
              component='label'
              onClick={handleClick}
              className={props.styles.playBtn}
            >
              <BsStopCircleFill />
            </IconButton>
          ) : (
            <IconButton
              color='secondary'
              aria-label='upload picture'
              component='label'
              onClick={handleClick}
              className={props.styles.playBtn}
            >
              <BsPlayCircle />
            </IconButton>
          )}
          {/* <div onClick={() => navigate('/plus', { state: { id: props.item.challengeId } })}>
            보내기
          </div> */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SelectItem;
