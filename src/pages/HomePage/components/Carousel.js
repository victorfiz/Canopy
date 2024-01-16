import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';
import Button from '../../../components/button/Button';

function Carousel() {
    const { authUser } = useAuth();
    let navigate = useNavigate();
    return (
        <div className='usedby'> 
        <div className='sm:text-[1.5em] text-[#475569] font-medium  ml-5 text-[1.2em] sm:mt-20 w-[100vw]  sm:text-center'>
    Used by students at 
    </div>
    <div className='usedby-carousel '> 
    <div className='carousel-cover'> </div>
    <div className='usedby-carousel-item mr-16 cambridge-bg pl-16'>
        </div>
        <div className='usedby-carousel-item mr-16 ml-16 columbia-bg'>
        </div>
        <div className=' harvard-bg usedby-carousel-item mr-16 ml-16 '>
        </div>
        <div className='usedby-carousel-item mr-16 ml-16 mit-bg'>
        </div>
        <div className='usedby-carousel-item mr-16  ml-16 oxford-bg'>
        </div>
        <div className='usedby-carousel-item mr-16 ml-16 penn-bg'>
        </div>
        <div className='usedby-carousel-item princeton-bg ml-16'>
        </div>
        

    </div>
    <div className='justify-center w-[100vw] mt-12 flex'>
    <Button
                text={"Get Started"}
                type={"black"}
                size={"large"}
                className='pr-12 pl-12'
                onPress={()=>{
                    if(authUser){
                        navigate('/account')
                    } else{
                        navigate('/signup')
                    }
                }}
            />
    </div>
    </div>
    );
}

export default Carousel