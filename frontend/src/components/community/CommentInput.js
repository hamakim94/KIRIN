import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UseAxios from '../../utils/UseAxios';
import Context from '../../utils/Context';
import ProfileImg from '../common/ProfileImg';

function CommentInput(props) {
  const [newComment, setNewComment] = useState('');
  const { userData } = useContext(Context);
  const location = useLocation();
  let toggle = false;
  const onCreate = () => {
    if (newComment.length === 0) {
      alert('글자를 입력해주세요.');
    } else {
      const communityCommentRequestDTO = {
        content: newComment,
        parentId: 0,
      };
      props.setCheckWrite(true);
      UseAxios.post(
        `/communities/stars/${location.state.starId}/boards/${location.state.boardId}/comments`,
        communityCommentRequestDTO
      )
        .then((res) => {
          console.log(res);
          setNewComment('');
          props.setCheckWrite(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
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
            className={props.styles.inputBox}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value.replace(/^\s*/, ''))}
            type={'text'}
            placeholder={'댓글 추가...'}
          ></input>
        </div>
        <button
          disabled={props ? props.checkWrite : true}
          style={{ fontSize: 14, backgroundColor: '#FFFFFF', borderWidth: 0 }}
          onClick={onCreate}
        >
          게시
        </button>
      </div>
    </div>
  );
}

export default CommentInput;
