import React from 'react';
import styles from './EditProfilePage.module.css';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';

function EditProfilePage() {
  return (
    <div>
      <div className={styles.topBox}>
        <a href="/mypage/setting">
          <BiArrowBack className={styles.back}></BiArrowBack>
        </a>
        <div className={styles.pageTitle}>프로필 편집</div>
        <div className={styles.fakeSetting}>
          <AiFillSetting></AiFillSetting>
        </div>
      </div>
      <div>{/* 프로필 이미지 변경 */}</div>
      <div>
        <Grid item xs={12}>
          <Typography sx={{ ml: 1, mb: 0.5 }}>이메일</Typography>
          <TextField
            required
            autoFocus
            fullWidth
            type="email"
            id="email"
            name="email"
            label="이메일"
            size="small"
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ ml: 1, mb: 0.5, mt: 1.5 }}>이름</Typography>
          <TextField required fullWidth id="name" name="name" label="이름" size="small" disabled />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ ml: 1, mb: 0.5, mt: 1.5 }}>닉네임</Typography>
          <div>
            <TextField
              required
              fullWidth
              id="nickname"
              name="nickname"
              label="닉네임"
              size="small"
            />
            {/*중복 확인*/}
          </div>
        </Grid>
      </div>
      <div>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
          프로필 편집
        </Button>
      </div>
    </div>
  );
}

export default EditProfilePage;
