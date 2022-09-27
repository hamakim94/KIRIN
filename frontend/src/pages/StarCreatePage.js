import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

function StarCreatePage() {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  return (
    <div>
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
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <div>기부 기관</div>
      <div>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <div>기부 기관</div>
      <div>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
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
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default StarCreatePage;
