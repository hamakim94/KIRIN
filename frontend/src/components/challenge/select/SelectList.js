import React from 'react';
import SelectItem from './SelectItem';

function SelectList(props) {
  return (
    <div>
      <SelectItem styles={props.styles}></SelectItem>
    </div>
  );
}

export default SelectList;
