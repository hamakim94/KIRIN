import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import UseAxios from '../utils/UseAxios';

function StarCreatePage() {
  const videoRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState(null);
  const [info, setInfo] = useState(null);
  const [musicTitle, setMusicTitle] = useState(null);
  const [donationOrganizationId, setDonationOrganizationId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [targetNum, setTargetNum] = useState(null);
  const [targetAmount, setTargetAmount] = useState(null);

  const onChangeVideo = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    } else {
      return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      title: title.trim(),
      info: info.trim(),
      musicTitle: musicTitle.trim(),
      length: 3.0,
      startDate,
      endDate,
      targetNum,
      targetAmount,
      donationOrganizationId,
    };
    console.log(body.length);
    const data = new FormData();
    data.append('video', video);
    const json = JSON.stringify(body);
    const blob = new Blob([json], { type: 'application/json' });
    data.append('starChallengeRequestDTO', blob);
    UseAxios.post(`/challenges/star`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (video) {
      videoRef.current.volume = 0.1;
    }
  }, [video]);
  return (
    <div style={{ paddingBottom: 55 }}>
      <form onSubmit={handleSubmit}>
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
            required
          />
        </div>
        <div>챌린지 제목</div>
        <div>
          <input
            style={{ width: '90%' }}
            type='text'
            value={title || ''}
            maxLength='45'
            onChange={(e) => setTitle(e.target.value.replace(/^\s*/, ''))}
            required
          ></input>
        </div>
        <div>챌린지 소개글</div>
        <div>
          <textarea
            style={{ width: '90%' }}
            value={info || ''}
            maxLength='255'
            onChange={(e) => setInfo(e.target.value.replace(/^\s*/, ''))}
            rows='5'
            required
          ></textarea>
        </div>
        <div>노래 제목</div>
        <div>
          <input
            type='text'
            value={musicTitle || ''}
            onChange={(e) => setMusicTitle(e.target.value.replace(/^\s*/, ''))}
            required
          ></input>
        </div>
        <div>기부 기관</div>
        <div>
          <input
            type='number'
            value={donationOrganizationId || ''}
            onChange={(e) => setDonationOrganizationId(e.target.value)}
            placeholder='숫자 1~3'
            required
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
            required
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            locale={ko}
            dateFormat='yyyy년 MM월 dd일'
            placeholderText='종료일'
            required
          />
        </div>
        <div>챌린지 목표</div>
        <div>
          <input
            type='number'
            value={targetNum || ''}
            onChange={(e) => setTargetNum(e.target.value)}
            required
          ></input>
          명
        </div>
        <div>공약 금액</div>
        <div>
          <input
            type='number'
            value={targetAmount || ''}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          ></input>
          토큰
        </div>
        <button
          style={{
            borderWidth: 0,
            width: '100%',
            marginTop: 10,
            marginBottom: 10,
            height: 30,
            backgroundColor: '#FFC947',
            color: 'white',
          }}
          type='submit'
        >
          업로드
        </button>
      </form>
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
