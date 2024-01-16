import React, {useEffect, useState} from 'react';
import VerticalBox from '../../../components/verticalBox/VerticalBox';

const VADDisplay = ({ 

 }) => {


    const [bars, setBars] = useState([0.8,0.2,0.5,0.3])
    const [vadIsSpeaking, setVadIsSpeaking] = useState("dwd")

    useEffect(()=>{

        window.addEventListener('probabilitiesEvent', (event) => {
            const newSpeechProb = event.detail.data.isSpeech
            //console.log(probablities)

            setBars((prevBars) => {
                const newBars = [...prevBars]
                // newBars.shift()
                newBars.push(newSpeechProb)
                if(newBars.length > 100) newBars.shift()
                return newBars
            }
            )
        })

        window.addEventListener('startedSpeakingEvent', (event) => {
                setVadIsSpeaking("Started")
        })

        window.addEventListener('stoppedSpeakingEvent', (event) => {



            setVadIsSpeaking("Stopped")
         



    })

      


    }, [])



    return (
        <VerticalBox
        title="VAD Display"
        height='300px'
        width='600px'
        >

            <div className='p-3 h-[200px] flex  items-end'> 
            {
                
                bars.map((bar, index) => {

                    const barHeight = bar*100+"%"

                    return (
                        <div 
                            className={`w-[2px] bg-black`} 
                            key={index}
                            style={{height: barHeight}}
                        ></div>
                    )
                })
            }
            <div className='h-[60%] bg-green w-[20px]'> </div>
            <div className='ml-10'> 
            {vadIsSpeaking}
            </div>
            </div>

        </VerticalBox>
    );
};

export default VADDisplay;
