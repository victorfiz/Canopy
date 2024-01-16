import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';
import Button from '../../../components/button/Button';

function HomepageHeader({ setOpenVideoModal }) {
    const { authUser } = useAuth();
    let navigate = useNavigate();
    return (
        <div className='homepage-header'>
            <div className='homepage-header-left flex'>
                <div alt="Logo" className="homepage-logo" />
                {/* <div className='text-lg'>Canopy</div> */}
            </div>
            <div className='homepage-center-options hide-800'>
                <button onClick={() => { navigate("/login") }} className="text-black font-medium text-sm leading-normal text-center ">Log In</button>
                <button onClick={() => {
                    window.location.replace("#homepage-pricing-section")
                }} className="text-black font-medium text-sm leading-normal text-center ml-6">Pricing</button>

                <button onClick={() => {
                    setOpenVideoModal(true)
                }} className="text-black font-medium text-sm leading-normal text-center ml-6">Demo</button>

                <button onClick={() => window.location.href = 'mailto:contact@canopyai.xyz'} className="text-black font-medium text-sm leading-normal text-center ml-6">Contact Us</button>

            </div>
            <div className='homepage-header-right flex justify-end'>

                {authUser ?
                    <Button
                        onPress={() => { navigate("/account") }}
                        type="black"
                        text="Get Started"
                        className='sm:mr-3 mr-0'
                    />

                    :
                    <Button
                        onPress={() => { navigate("/signup") }}
                        className="sm:mr-3 mr-0"
                        type="black"
                        text="Get Started"
           
                    />
                }

            </div>
        </div>
    );
}

export default HomepageHeader