import React from 'react';

const Text = ({ fontWeight, children }) => {
  const style = {
    fontWeight: fontWeight || 'normal',
  };

  return <p style={style}>{children}</p>;
};

export default Text;