import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';
import PricingBox from '../../Pricing/components/PricingBox'
import {upgradePlan} from '../../../pages/Pricing/functions/upgradePlan.js'


function Pricing() {
    const { authUser } = useAuth();
    let navigate = useNavigate();
    return (
        <>
            <div className='usedby-title  ml-3 text-center text-[#120F54]' id="homepage-pricing-section">
                Pay once. Use forever.
            </div>

            <div className='pricing-boxes flex justify-center mt-10 ml-6'>
                {/* <PricingBox

                    buttonType={authUser?'secondary':'primary'}
                    planType={!authUser?'Start here!':''}
                    planTitle='Free Plan'
                    buttonText="Get Started"
                    className='mr-4'
    
                    
                    txts={[
                        { text: 'Start your free plan', positive: true },
                        { text: 'No credit card needed', positive: true },
                        { text: 'Track progress and scores', positive: false },
                        { text: 'Access company specific practice', positive: false },
                        { text: 'Access by topic and theme', positive: false }
                      ]
                      }
                    buttonOnPress={() => {

                        if(!authUser){
                            navigate("/signup");
                        }else {
                           navigate("/account")
                        }



                    }}

                /> */}

                <PricingBox

                    buttonType={!authUser?'secondary':'primary'}
                    planType={!authUser?'':"I'm applying"  }

                    planTitle={<span><span className='line-through mr-2 text-gray-400'> $79</span>$49</span>}
                    buttonText="Become a pro"
                    className='mr-4'
                    txts={[
                        { text: 'Practice unlimited interviews', positive: true },
                        { text: 'Access unlimited feedback', positive: true },
                        { text: 'Track progress and scores', positive: true },
                        { text: 'Practice by round by company', positive: true },
                        { text: 'Practice by topic and theme', positive: true }
                      ]
                      }
                    isAsync={authUser?false:true}
                    loadingText='Hang on...'
                    buttonOnPress={
                        async () => {

                        
                        if(!authUser){
                            navigate("/signup");
                        }else {
                            await upgradePlan({authUser})
                        }


                    }}

                />

               

            </div>
        </>
    );
}

export default Pricing