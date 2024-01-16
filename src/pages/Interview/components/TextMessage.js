import React from 'react';

function TextMessage({ content, isIDEOpen }) {
  return <div className=
    {isIDEOpen ? 'chat-text-ide' : 'chat-text'}
  >{content}</div>;
}

export default TextMessage;