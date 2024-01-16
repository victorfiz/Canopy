import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth';
import { useNavigate } from "react-router-dom";
import LoadingIcon from './components/LoadingIcon';
import Button from '../../components/button/Button.js';
import Banner from '../../components/banner/Banner.js';
import VerticalBox from '../../components/verticalBox/VerticalBox.js';


function ResetPassword() {
    const [email, setEmail] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { authUser, isLoading, resetForgottenPassword } = useAuth();

    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && authUser) {
            navigate("/");
        }
    }, [authUser, isLoading])

    const handleSubmit = async e => {
        e.preventDefault();

        const errorMessage = await resetForgottenPassword(email);
        if (errorMessage) {
            setErrorMessage(errorMessage);
        } else {
            setShowConfirmation(true);
            setErrorMessage('');
        }
    }

    return ((isLoading || (!isLoading && !!authUser)) ?
        <LoadingIcon type={"fullPage"} />
        :
        <section className="bg-gray-50 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src="https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2Flogo.png?alt=media&token=99d67a70-0729-4ceb-b8e8-bba6126c6935" alt="logo"></img>
                    Canopy
                </div>
                <VerticalBox 
                width='600px'
                className="bg-white w-full max-w-md">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in to your account
                        </h1>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input onChange={e => setEmail(e.target.value)} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@example.com" required=""></input>
                            </div>
                            <div className="text-center">
                                <span className="text-sm text-red-500">{errorMessage}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">

                                </div>
                            </div>
                            <Button
                                size="medium"
                                type="primary"
                                text="Send Password Reset Link"
                                isAsync={true}
                                fullWidth={true}
                                onPress={handleSubmit}
                                loadingText={"Sending reset link"}
                            />
      
                    </div>
                </VerticalBox>
                {showConfirmation && (
                    <Banner
                        setIsChildVisible={setShowConfirmation}
                        isChildVisible={showConfirmation}
                        type={"default"}
                        className='mt-4 w-full max-w-md'
                        isActionButton={true}
                        bannerTitle={"Password reset email sent"}
                        bannerSubtitle={"A link has been sent to your email address if it exists."}
                        onActionButtonPress = {() => navigate("/login")}
                        actionButtonText={"Return to login"}
                    />
                )}
            </div>
        </section>
    );
}

export default ResetPassword