import React, { useEffect, useRef } from 'react';
import SelectItem from './SelectItem';

function SelectList(props) {
  const audioRef = useRef(null);
  const checkRef = useRef(null);
  const prevRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      checkRef.current = null;
      prevRef.current = null;
    };
  }, []);
  return (
    <div>
      {props.data
        ? props.data.map((item, index) => (
            <SelectItem
              styles={props.styles}
              item={item}
              index={index}
              audioRef={audioRef}
              checkRef={checkRef}
              prevRef={prevRef}
              key={index}
              setIsOpen={props.setIsOpen}
            />
          ))
        : ''}
    </div>
  );
}

export default SelectList;
