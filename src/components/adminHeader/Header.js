import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import HeaderPP from './HeaderPP.js';
import HeaderLinks from './HeaderLinks.js';
import PhoneHeaderPP from './PhoneHeaderPP.js';

const Header = ({ 
    setIsResumeOpen, 
    selected, 
    isCreateInterviewInfo = {}
 }) => {

    let navigate = useNavigate();
    const [isPPMenuOpen, setIsPPMenuOpen] = useState(false);

    return (
   
        <div className="widget-header-admin">
        <div className='header-top-row flex justify-between'>
            <div className='flex'> 
        <div className='widget-header-logo logo mr-3 mb-2'></div>
        <div className='mt-1 text-white font-medium'>
        Canopy Admin Panel
        
        </div>
 
        </div>
        <HeaderPP
            setIsResumeOpen={setIsResumeOpen}
            isPPMenuOpen={isPPMenuOpen}
            setIsPPMenuOpen={setIsPPMenuOpen}
            isCreateInterviewInfo={isCreateInterviewInfo}
            />

        <PhoneHeaderPP
            setIsResumeOpen={setIsResumeOpen}
            isPPMenuOpen={isPPMenuOpen}
            setIsPPMenuOpen={setIsPPMenuOpen}
            isCreateInterviewInfo={isCreateInterviewInfo}
            />
        </div>
                
               <HeaderLinks selected={selected} />
           
        </div>
    );
};

export default Header;