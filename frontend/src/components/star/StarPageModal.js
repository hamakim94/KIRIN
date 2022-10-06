import React, { useState } from 'react';

import { Modal } from '@mui/material';
import UseAxios from '../../utils/UseAxios';

const style = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  border: '2px solid #000',
  boxShadow: 24,
  m: 5,
};

function StarPageModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [info, setInfo] = useState(props.info);
  const revise = async () => {
    await UseAxios.put(`/users/change-star`, { info: info }, {})
      .catch((err) => console.log(err))
      .then((res) => {
        // console.log(res);
        handleClose();
        props.setInfo(info);
      });
  };

  return (
    <div style={{ minWidth: 50, minHeight: 20 }} onClick={handleOpen}>
      <div className={props.styles.contentBox}>{props.info}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div style={style}>
          <textarea
            value={info || ''}
            maxLength='255'
            style={{ width: '90%' }}
            onChange={(e) => setInfo(e.target.value.replace(/^\s*/, ''))}
            rows='5'
            // required
          ></textarea>
          <button style={{ width: '10%' }} onClick={revise}>
            수정
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default StarPageModal;
