import React, { useContext, useRef, useState } from 'react';
import SavanaCommentList from './SavanaCommentList';
import styles from './Savana.module.css';
import Context from '../../utils/Context';
import ProfileImg from '../common/ProfileImg';
function SavanaComment(props) {
  const [newComment, setNewComment] = useState('');
  const [checkWrite, setCheckWrite] = useState(false);
  const { userData } = useContext(Context);
  const [commentData, setCommentData] = useState([
    {
      id: 1,
      content: '하잉',
    },
  ]);

  useEffect(() => {
    UseAxios.get(`/challenges/comments`, { params: { challengeId: props.challengeId } }).then(
      (res) => {
        setCommentData(res.data);
      }
    );
    if (props.data) {
      setLike({
        likeCnt: props.data.communityDTO.likeCnt,
        liked: props.data.communityDTO.liked,
      });
      setCommentCnt(props.data.communityDTO.commentCnt);
    }
  }, []);
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
