import React from 'react';

const TextAlign = ({ alignment, children }) => {
  const textStyle = {    textAlign: alignment  };
  return <div style={textStyle}>{children}</div>;
};

export default TextAlign;