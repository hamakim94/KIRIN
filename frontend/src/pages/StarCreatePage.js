import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

function StarCreatePage() {
  const videoRef = useRef(null);
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState(null);
  const [orgaId, setOrgaId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [targetNum, setTargetNum] = useState(null);
  const [targetAmount, setTargetAmount] = useState(null);

  const onChangeImg = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    } else {
      return;
    }
  };
  const onChangeVideo = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    } else {
      return;
    }
  };
  useEffect(() => {
    if (video) {
      videoRef.current.volume = 0.1;
    }
  }, [video]);
  return (
    <div style={{ paddingBottom: 55 }}>
      <form>
        <div style={{ margin: 5 }}>
          <label htmlFor='ex_img' style={{ borderWidth: 1, borderStyle: 'solid' }}>
            이미지 업로드
          </label>
          <input
            type='file'
            accept='image/*'
            id='ex_img'
            onChange={onChangeImg}
            style={{ display: 'none' }}
          />
        </div>
        <div style={{ margin: 5 }}>
          <label htmlFor='ex_video' style={{ borderWidth: 1, borderStyle: 'solid' }}>
            동영상 업로드
          </label>
          <input
            type='file'
            accept='video/*'
            id='ex_video'
            onChange={onChangeVideo}
            style={{ display: 'none' }}
          />
        </div>
        <div>챌린지 제목</div>
        <div>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div>기부 기관</div>
        <div>
          <input
            type='number'
            value={orgaId}
            onChange={(e) => setOrgaId(e.target.value)}
            placeholder='숫자 1~3'
          ></input>
        </div>
        <div>
          챌린지 기간
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale={ko}
            dateFormat='yyyy년 MM월 dd일'
            placeholderText='시작일'
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            locale={ko}
            dateFormat='yyyy년 MM월 dd일'
            placeholderText='종료일'
          />
        </div>
        <div>챌린지 목표</div>
        <div>
          <input
            type='number'
            value={targetNum}
            onChange={(e) => setTargetNum(e.target.value)}
          ></input>
          명
        </div>
        <div>공약 금액</div>
        <div>
          <input
            type='number'
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          ></input>
          토큰
        </div>
      </form>
      {img ? (
        <img alt='이미지' src={URL.createObjectURL(img)} height={'100%'} width={'100%'}></img>
      ) : (
        ''
      )}
      {video ? (
        <video
          ref={videoRef}
          controls
          src={URL.createObjectURL(video)}
          height={'100%'}
          width={'100%'}
        ></video>
      ) : (
        ''
      )}
    </div>
  );
}

export default StarCreatePage;
