import React from 'react';

const Text = ({ textDecoration, children }) => {
  const style = { textDecoration: textDecoration || 'none' };
  return <p style={style}>{children}</p>;
};

export default Text;