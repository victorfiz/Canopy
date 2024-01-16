import React, { useState, useEffect, useRef } from 'react';
import useCreateWebSocket from './../Hooks/initialiseInterviewerSocket.js';
import { requestCameraPermission } from './functions/requestCameraPermission.js'
import { requestMicrophonePermission } from './functions/requestMicrophonePermission.js'
import { useNavigate, useParams } from 'react-router-dom';
import VerticalBox from '../../components/verticalBox/VerticalBox.js';
import Footer from '../../components/footer/Footer.js';
import TextButton from '../../components/textButton/TextButton.js';
import {BsArrowRight} from 'react-icons/bs'

const Instructions = ({ }) => {

  const navigate = useNavigate();
  const { interviewId } = useParams();
  const [isActive, setIsActive] = useState(false)
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
  });

  const [errorText, setErrorText] = useState(''); // New state
  const [isPlayAvatarClicked, setIsPlayAvatarClicked] = useState(false)


  useCreateWebSocket({ active: isActive })

  useEffect(() => {

    requestCameraPermission({ setPermissions, setErrorText });
    requestMicrophonePermission({ setPermissions, setErrorText });

  }, []);

  return (



    <div className='height-[100vh] width-[100vw] flex justify-center items-center min-h-screen bg-[#f5f5f6]'>
      <VerticalBox

      

        width={'calc(min(800px, 90vw))'}
        title="Interview Top Tips"
        className='p-4'
      >

        <div className="bg-white p-6 rounded-lg text-center">

          <div>
            <ul className="list-decimal list-inside text-left">

              <li className="mb-4">
                <strong>Like a human 💬:</strong> Give the same responses you would give to a human. You can interrupt, speak in your normal accent, pitch, and tone.
              </li>
              <li className="mb-4">
                <strong>Patience is Key ⏳:</strong>
                It may take your interviewer 1-2 seconds to reply to you.
              </li>
              <li className="mb-4">
                <strong>Help is Here 🙋‍♀️:</strong> If at any point you feel stuck or unsure during the interview, don't hesitate to ask your interviewer for guidance or clarification. They're there to help you perform your best!
              </li>
              <li className="mb-4">
                <strong>Give us Permission 🫱:</strong>
                We advise you give Canopy permission to use your camera and microphone at all times, so avoid any technical issues.
                <br></br>
                <br></br>
                <p> Guides for
                  <a
                    href="https://support.google.com/chrome/answer/2693767?hl=en-GB&co=GENIE.Platform%3DDesktop"
                    target="_blank"
                    rel="noreferrer"
                    className='ml-1 mr-1 underline '>
                    Chrome,
                  </a>
                  and
                  <a
                    href='https://help.doxy.me/en/articles/836274-camera-and-microphone-permission-safari'
                    target='_blank'
                    rel="noreferrer"
                    className='ml-1 mr-1 underline'
                  >
                    Safari.
                  </a>
                </p>
              </li>

            </ul>
            <p> 
              <div className='flex '>
              <TextButton
                type="primary"
                size="medium"
                text="Go back to interview"
                icon={
                  <div className='flex items-center  h-full'> 
                <BsArrowRight/>
                </div>
                }
                onPress={() => {
                  navigate(`/interview/${interviewId}`);
                }}
              
              
              />
              </div>
              </p>
          </div>


          <div style={{ width: '50%', marginRight: '2%' }}>
          </div>
          <div className="error-text">{errorText}</div>

        </div>
        <Footer>
          <div className="flex items-center mr-5">
            <input
              className="w-4 bg-blue-500 border-none outline-none cursor-pointer mr-1"
              type="checkbox"
              id="cameraPermission"
              checked={permissions.camera}
              onChange={requestCameraPermission}
              aria-label="Camera permission"
              readOnly
            />
            <label htmlFor="cameraPermission" onClick={requestCameraPermission}>
              <span className={permissions.camera ? 'crossed-out' : ''}>Camera permission</span>
            </label>
          </div>

          <div className="flex items-center">
            <input
              className="w-4 bg-blue-500 border-none outline-none cursor-pointer mr-1"
              type="checkbox"
              id="microphonePermission"
              checked={permissions.microphone}
              onChange={requestMicrophonePermission}
              aria-label="Microphone permission"
              readOnly
            />
            <label htmlFor="microphonePermission" onClick={requestMicrophonePermission}>
              <span className={permissions.microphone ? 'crossed-out' : ''}>Microphone permission</span>
            </label>
          </div>
        </Footer>
      </VerticalBox>
    </div>
  );
};

export default Instructions;