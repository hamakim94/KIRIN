import React, { useRef, useState } from 'react';
import SavanaCommentList from './SavanaCommentList';
import styles from './Savana.module.css';

function SavanaComment() {
  const [newComment, setNewComment] = useState('');
  const [commentData, setCommentData] = useState([
    {
      id: 1,
      content: '하잉',
    },
  ]);
  const nextId = useRef(commentData[0].id + 1);
  const onCreate = () => {
    const comment = {
      id: nextId.current,
      content: newComment,
    };
    setCommentData(commentData.concat(comment));

    setNewComment('');
    nextId.current += 1;
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        <div
          style={{
            height: 35,
          }}
        >
          <img
            alt="star"
            className={styles.commentImg}
            src="https://cdn.pixabay.com/photo/2022/05/06/17/15/cartoon-giraffe-7178753_960_720.jpg"
          ></img>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderStyle: 'solid',
            flex: 1,
            borderWidth: 0,
            borderBottomWidth: 0.3,
            padding: 8,
            marginLeft: 10,
          }}
        >
          <div style={{ flex: 1, marginRight: 15 }}>
            <input
              className={styles.inputBox}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type={'text'}
              placeholder={'댓글 추가...'}
            ></input>
          </div>
          <div style={{ color: '#7E370C', fontSize: 14 }} onClick={onCreate}>
            게시
          </div>
        </div>
      </div>
      <SavanaCommentList styles={styles} commentData={commentData}></SavanaCommentList>
    </div>
  );
}

export default SavanaComment;
