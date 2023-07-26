import React from 'react';

const Padding = ({ size, children }) => {
  const paddingStyle = { padding: size };
  return <div style={paddingStyle}>{children}</div>;
};

export default Padding;