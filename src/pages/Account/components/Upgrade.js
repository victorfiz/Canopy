import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import Footer from '../../../components/footer/Footer';
import Button from '../../../components/button/Button';
import { upgradePlan } from '../../../pages/Pricing/functions/upgradePlan.js'
import { useAuth } from '../../../auth';

function Upgrade({ showModal, setShowModal, windowWidth }) {

    const { authUser } = useAuth();

    let navigate = useNavigate();
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {

        const handlePlay = () => {
            setIsVideoLoaded(true);
        };

        const handlePause = () => {
            setIsVideoLoaded(false);
        };

        const videoElement = videoRef.current;

        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);

        return () => {
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
        };
    }, []);


    return (


        <VerticalBox

            height={"fit-content"}
            width='calc(min(600px, 90vw))'
            title="Upgrade ⚡"

        >



            <div className="relative p-3 flex-auto mb-3">
                Watch our demo to see what Canopy Pro is like!
            </div>
            <div  
                className='upgrade-vid-h'
                style={{
                    width: 'calc(min(600px, 90vw))',
                    height: '340px',
                }}
                >
                <video
                    controls
                    width="calc(min(600px, 90vw))"
                    height="300"
                    autoPlay
                    loop
                    preload="auto"
                    className={isVideoLoaded ? "" : 'opacity-0'}
                    ref={videoRef}
                >

                    <source src="https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/Canopy_Demo.mov?alt=media&token=cabfed8d-4ab9-4e2a-ad99-3edab1130e4a&_gl=1*chncbo*_ga*MzYwMjY1OTUzLjE2OTg2MDM5Mzk.*_ga_CW55HF8NVT*MTY5OTEwMTUyNy4xMC4xLjE2OTkxMDE3NDguNjAuMC4w" type="video/mp4" />

                </video>

            </div>
            <Footer>
                <Button
                    type={"secondary"}
                    text={"See Pricing"}
                    className='mr-4'
                    onPress={
                        () => {
                            navigate('/pricing')
                        }
                    }
                ></Button>
                <Button
                    type={"primary"}
                    text={"Upgrade"}
                    isAsync={true}
                    loadingText={"Upgrading..."}
                    onPress={
                        async () => {
                            if (authUser) {
                                await upgradePlan({ authUser })
                                setShowModal(false)
                            }

                        }
                    }

                ></Button>
            </Footer>



        </VerticalBox>


    );
}

export default Upgrade;