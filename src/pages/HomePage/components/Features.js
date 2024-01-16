import React from 'react'
import VerticalBox from '../../../components/verticalBox/VerticalBox';

function Features() {

    return (
        <>
          
          <div className='features mt-20 flex'> 
                <div> 
                <VerticalBox 
                className='feature feature-1'
                // width='600px'
                height='770px'
                > 
                    <div className='feature-img feature-img-1'> </div>
                    <div className='feature-title mt-5'> 
                        Prepare for anything
                    </div>
                    <div className='feature-subtitle'>
                        Practice  for any role and stage. 
                        Technical, HR, non-technical... we've got you covered.
                    </div>
                
                </VerticalBox>
                </div>
                <div> 
                <VerticalBox 
                className='feature mb-5'
                height='200px'
                > 
  
                    <div className='feature-title'> 
                        High Fidelity
                    </div>
                    <div className='feature-subtitle'>
                        Our Interviews are built by successful applicants for the role you are applying for.
                    </div>
                
                </VerticalBox>
                <VerticalBox 
                className='feature'
           
                > 
                    <div className='feature-img feature-img-2'> </div>
                    <div className='feature-title'> 
                    Unlimited Preparation
                    </div>
                    <div className='feature-subtitle mb-10'>
                    You can practice as many times as you want on a wide range of interviews and questions.
                    </div>
                
                </VerticalBox>
            </div>
         
            </div>
                </>
    );
}

export default Features