import React from 'react';

function Loading(props) {
  return <marquee scrollamount='5'>{props.text}</marquee>;
}

export default Loading;
