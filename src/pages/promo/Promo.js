import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VerticalBox from '../../components/verticalBox/VerticalBox';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import { submitCode } from './functions/submitCode';
import Banner from '../../components/banner/Banner';
import {useAuth } from '../../auth';


const Promo = () => {
    const { authUser } = useAuth();
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [banner, setBanner] = useState(false);

    useEffect(() => {
        if(authUser){
            console.log("authUser");
            if(authUser.is_subscription){
                navigate('/account');
            } 
        }
    }, [authUser])

    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-[#f5f5f6]">

            <div className={banner?'absolute top-2 ml-2 mr-2':'hidden'}> 
                <Banner
                    type='critical'
                    bannerTitle='Invalid PROMO code'
                    bannerSubtitle='Please try again. Make sure the spelling is correct. Codes are case sensitive.'
                />
            </div>
            <VerticalBox
                height='min-content'
                width='calc(min(800px,90vw))'
                title="Add a promo code"
            >

                <input
                    onChange={e => setPromoCode(e.target.value)}
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5 ml-3 mr-3 mb-4"
                    placeholder="Enter your promo code..."
                    required="" />

                <Footer
                 
                >
                    <Button
                        text="I don't have one"


                        onPress={() => {
                            navigate('/account');
                        }}
                    ></Button>
                             <Button
                        text="Submit code"
                        className='ml-4'
                        type='primary'
                        isAsync={true}
                        onPress={async () => {
                            console.log("pressed");
                            if(authUser){
                                console.log("authUser");
                                let isPromoValid = await submitCode({code:promoCode, setBanner, uid: authUser.uid});
                                console.log("isPromoValid", isPromoValid);
                                if(isPromoValid.isCode){
                                    navigate('/account');
                                } else {
                                    setBanner(true);
                                }

                            } else {
                                console.log("no authUser");
                                navigate("/signup")
                            }
                        }}
                    ></Button>
                </Footer>

            </VerticalBox>


        </div>
    );
};

export default Promo;