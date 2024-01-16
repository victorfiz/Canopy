import React from 'react';

function ImageMessage({ content }) {
  return <img src={content} alt="chat-image"  className='chat-image'/>;
}

export default ImageMessage;
