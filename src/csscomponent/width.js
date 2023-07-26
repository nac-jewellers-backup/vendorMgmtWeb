import React from 'react';

const Width = ({ width, children }) => {
  const widthStyle = {    width: width  };
  return <div style={widthStyle}>{children}</div>;
};

export default Width;