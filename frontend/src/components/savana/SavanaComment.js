import React, { useContext, useEffect, useState } from 'react';
import SavanaCommentList from './SavanaCommentList';
import styles from './Savana.module.css';
import Context from '../../utils/Context';
import ProfileImg from '../common/ProfileImg';
import UseAxios from '../../utils/UseAxios';

function SavanaComment(props) {
  const [newComment, setNewComment] = useState('');
  const { userData } = useContext(Context);
  const [commentData, setCommentData] = useState(null);
  const [checkWrite, setCheckWrite] = useState(false);
  const [replyCheck, setReplyCheck] = useState(null);

  useEffect(() => {
    UseAxios.get(`/challenges/comments`, {
      params: {
        challengeId: props.challengeId,
      },
    }).then((res) => {
      setCommentData(res.data);
    });
  }, []);

  const onCreate = () => {
    if (newComment.length === 0) {
      alert('글자를 입력해주세요.');
    } else {
      const ChallengeCommentRequestDTO = {
        content: newComment,
        parentId: 0,
      };
      setCheckWrite(true);
      UseAxios.post(`/challenges/comments`, ChallengeCommentRequestDTO, {
        params: { challengeId: props.challengeId },
      })
        .then((res) => {
          console.log(res);
          setNewComment('');
          setCheckWrite(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
        <div
          style={{
            height: 50,
          }}
        >
          <ProfileImg src={userData.profileImg} size={'40px'} />
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
              onChange={(e) => setNewComment(e.target.value.replace(/^\s*/, ''))}
              type={'text'}
              placeholder={'댓글 추가...'}
            ></input>
          </div>
          <button
            disabled={checkWrite}
            style={{ fontSize: 14, backgroundColor: '#FFFFFF', borderWidth: 0 }}
            onClick={onCreate}
          >
            게시
          </button>
        </div>
      </div>
      <SavanaCommentList styles={styles} commentData={commentData}></SavanaCommentList>
    </div>
  );
}

export default SavanaComment;
