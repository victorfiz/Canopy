import React, { useState, useEffect } from 'react';

const SubtitlesContainer = ({ }) => {

  const [subtitle, setSubtitle] = useState('');


  useEffect(() => {
    const setSubtitleEventHandler = (event) => {
      setSubtitle(event.detail);
    }

    document.addEventListener('setSubtitleEvent', setSubtitleEventHandler);

    return () => {
      document.removeEventListener('setSubtitleEvent', setSubtitleEventHandler);
    }
  }, []);
  return (
    
    <div className="text-center subititles-container">
      <div className="bg-black bg-opacity-60 text-white inline-block rounded px-2 py-[2px]">
        {subtitle} 
    
      </div>
    </div>
  );
};

export default SubtitlesContainer;