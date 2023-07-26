import React from 'react';

const Text = ({ color, children }) => {
	const style = { color: color || 'black' };
	return <p style={style}>{children}</p>;
};

export default Text;