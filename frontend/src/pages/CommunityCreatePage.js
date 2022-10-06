import React, { useContext, useCallback, useRef, useState } from 'react';
import Context from '../utils/Context';
import styles from './CommunityCreatePage.module.css';
import UseAxios from '../utils/UseAxios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';

function CommunityCreatePage() {
  const { userData } = useContext(Context);
  const [content, setContent] = useState(null);
  const textRef = useRef(null);
  const fileInput = useRef(null);
  const [coverImg, setCoverImg] = useState(null);
  const [uploadImg, setUploadImg] = useState(null);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = 'auto';
    const height = textRef.current.scrollHeight + 'px';
    textRef.current.style.height = height;
  }, []);

  const onChange = (e) => {
    if (e.target.files[0]) {
    } else {
      //업로드 취소할 시
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setUploadImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    setCheck(true);
    e.preventDefault();
    let body = {
      content,
    };
    const data = new FormData();
    data.append('image', uploadImg);
    const json = JSON.stringify(body);
    const blob = new Blob([json], { type: 'application/json' });
    data.append('communityRequestDTO', blob);
    UseAxios.post(`/communities/stars/${userData.id}/boards`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        navigate(-1);
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
        setCheck(false);
      });
  };
  return userData ? (
    <div className='wrapper'>
      <Header title={'커뮤니티 작성'}></Header>
      <div className={styles.writerWrapper}>
        <div>
          <img alt='star' className={styles.starImg} src={`/files/${userData.profileImg}`}></img>
        </div>
        <div className={styles.nameWrapper}>
          <b>{userData.nickname}</b>
          <span className={styles.writeDate}>시간</span>
        </div>
      </div>
      <div className={styles.midWrapper}>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', border: 0, fontSize: 16 }}
            onInput={handleResizeHeight}
            required
          ></textarea>
          <div
            onClick={() => {
              fileInput.current.click();
            }}
          >
            이미지 선택
          </div>
          <div>
            <img className={styles.communityImg} src={coverImg}></img>
          </div>
          <input
            type='file'
            style={{ display: 'none' }}
            accept='image/*'
            name='coverImg'
            onChange={onChange}
            ref={fileInput}
            required
          ></input>
          <button disabled={check} type='submit' className={styles.subBtn}>
            제출
          </button>
        </form>
      </div>
    </div>
  ) : (
    '로딩로딩'
  );
}

export default CommunityCreatePage;
