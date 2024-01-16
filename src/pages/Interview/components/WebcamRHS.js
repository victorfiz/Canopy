import React, { useState, useEffect, useRef } from 'react';
import Messages from './Messages.js';
import { repeatHandlePlayNod } from '../functions/repeatHandlePlayNod'
import VerticalBox from '../../../components/verticalBox/VerticalBox.js';
import { AiOutlineExpandAlt, AiOutlineCompress } from "react-icons/ai";
import AnimateHead from './AnimateHead.js';
import Reactions from './Reactions.js';


const WebcamRHS = ({
  isIDEOpen,
  overlayVideoRef,
  isChatExpanded,
  setIsChatExpanded,

}) => {

  const isReactionsOpen = useRef(false);
  const overlayVideoUrl = "https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2FsynthesiaFiles%2FCanopyIntro.mp4?alt=media&token=0ad09de1-b4df-44be-be6e-d8c4d8ff12f4"

  const [openVideoDisplay, setOpenVideoDisplay] = useState(1);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [hasUserSpoken, setHasUserSpoken] = useState(false);
  const [isReactionsPlaying, setIsReactionsPlaying] = useState(false);


  useEffect(() => {

    window.addEventListener('startedSpeakingEvent', (event) => {
      setIsUserSpeaking(true);
      setOpenVideoDisplay(0);
      isReactionsOpen.current = true;
      setIsReactionsPlaying(true);
      setHasUserSpoken(true);
    })

    window.addEventListener('stoppedSpeakingEvent', (event) => {
      setIsUserSpeaking(true);
      isReactionsOpen.current = false;
      setIsReactionsPlaying(false);

    })


    window.addEventListener("triggerSpeechEvent", (event) => {
      setOpenVideoDisplay(1);

    });



    //
  }, []);

  return (
    <div className={`transition-width duration-300 ease-in-out pr-2`}>



        <div className={`${isChatExpanded?"absolute left-[20px] mt-4":"sm:relative top-[20px]"} ml-[20px] sm:ml-0  h-full fixed  mb-[40px]  rounded-md w-[250px] overflow-hidden max-h-[140px]  sm:block `}>
          <div className={`${hasUserSpoken ? "hidden" : ""}`}>
            <video ref={overlayVideoRef} src={overlayVideoUrl} playsInline autoPlay />
          </div>
          <div className={hasUserSpoken ? 'transform scale-[1.03] translate-y-[-2.5px]' : ""}>
            <div className={`absolute ${openVideoDisplay === 0 ? "" : "opacity-0 "}}`} >
              <Reactions
                isReactionsOpen={isReactionsOpen}
                isReactionsPlaying={isReactionsPlaying}
              />
            </div>
          </div>

          <div className={hasUserSpoken ? `( ${openVideoDisplay === 1 ? "" : "invisible opacity-0"})` : "hidden"}>
            <AnimateHead
            />
          </div>


        </div>


      <VerticalBox

        height={"calc(100vh - 200px)"}
        isBorder={!isChatExpanded}
        className={` min-w-[100vw] overflow-hidden ${isChatExpanded?"min-h-[100vh] sm:rounded-md":"min-h-0 sm:mt-4  hidden sm:block"} h-[%] sm:min-w-[250px] sm:static sm:ml-0 sm:mr-0 sm:w-[250px]   sm:overflow-hidden`}
        title={
          <div className='flex justify-between'>
            <div> Messages</div>
            {
              isChatExpanded ?
                <AiOutlineCompress
                  size={20}
                  strokeWidth={0.05}
                  className='mr-0.5 pointer mt-0.5'
                  onClick={() => {
                    setIsChatExpanded(!isChatExpanded)
                  }}
                />
                :
                <AiOutlineExpandAlt
                  size={20}
                  strokeWidth={0.05}
                  className='mr-0.5 pointer mt-0.5'
                  onClick={() => {
                    setIsChatExpanded(!isChatExpanded)
                  }}
                />

            }

          </div>
        }
      >

        <Messages
          isIDEOpen={isIDEOpen}
          setIsChatExpanded={setIsChatExpanded}
          isChatExpanded={isChatExpanded}
        />
      </VerticalBox>

    </div>

  );
};

export default WebcamRHS;