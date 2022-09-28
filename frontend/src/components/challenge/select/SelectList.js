import React, { useRef, useState } from 'react';
import SelectItem from './SelectItem';

function SelectList(props) {
  const audioRef = useRef(null);
  const [checkIdx, setCheckIdx] = useState(null);
  return (
    <div>
      {props.data
        ? props.data.map((item, index) => (
            <SelectItem
              styles={props.styles}
              item={item}
              index={index}
              audioRef={audioRef}
              checkIdx={checkIdx}
              setCheckIdx={setCheckIdx}
              key={index}
            />
          ))
        : ''}
    </div>
  );
}

export default SelectList;
