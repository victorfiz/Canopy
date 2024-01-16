import React, { useState, useEffect } from 'react';
import Button from '../../../components/button/Button';

const StopWatch = ({ stopwatchStart, setStopwatchStart }) => {

  const [stopwatchTime, setStopwatchTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (stopwatchStart) {
      window.interviewStartTime = Date.now();
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [stopwatchStart]);

  useEffect(() => {
    setStopwatchStart(true);
  }, []);

  return (
    <Button className="stopwatch flex cursor-default w-[100px] hidden sm:block"
      isAsync={false}
      size="small"
      type="secondary"
      text={new Date(stopwatchTime * 1000).toISOString().substr(11, 8)}
      onPress={() => setStopwatchStart(!stopwatchStart)}
    />

  
        

  );
};

export default StopWatch;