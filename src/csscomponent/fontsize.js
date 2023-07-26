import React from 'react';

const Text = ({ fontSize, children }) => {
  const style = {
    fontSize: fontSize || '16px',
  };

  return <p style={style}>{children}</p>;
};

export default Text;