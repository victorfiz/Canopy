import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth';
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Button from '../../components/button/Button';
import {getRedirectPath} from './functions/getRedirectPath'

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isSignupActive, setIsSignupActive] = useState(false);


    const { authUser, isLoading, signUpWithEmailAndPassword, signInWithGoogle } = useAuth();

    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && authUser && isSignupActive) {
            let redirectURL = getRedirectPath({ href: window.location.href });
            navigate(redirectURL);
        }
    }, [authUser, isLoading, isSignupActive])

    const handleSubmit = async e => {
        setIsSigningUp(true)
        e.preventDefault();

        const errorMessage = await signUpWithEmailAndPassword(email, password);

        if (errorMessage) {
            setIsSigningUp(false)
            setErrorMessage(errorMessage);
        }
    }

    const handleSignUpWithGoogle = async (e) => {
        e.preventDefault();
        await signInWithGoogle();
        setIsSignupActive(true);
    }

    return (
        <section className="bg-gray-50 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src="https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2Flogo.png?alt=media&token=99d67a70-0729-4ceb-b8e8-bba6126c6935" alt="logo"></img>
                    Canopy
                </div>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign up for an account
                        </h1>

  
                        <button onClick={handleSignUpWithGoogle} className="w-full bg-gray-300 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="h-5 w-5 mr-2" />
                            Sign up with Google
                        </button>

      
                        <div className="flex items-center justify-between">
                            <hr className="w-1/2" />
                            <span className="text-gray-600">or</span>
                            <hr className="w-1/2" />
                        </div>


                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input onChange={e => setEmail(e.target.value)} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                                placeholder="yoda@university.edu" 
                                required=""></input>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <div className="relative">
                                    <input onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required=""></input>
                                    <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {showPassword ? <BsEyeSlash size={20} strokeWidth={0.25} /> : <BsEye size={20} strokeWidth={0.25} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="text-center">
                                    <span className="text-sm text-red-500">{errorMessage}</span>
                                </div>
                            </div>
                            <Button
                                size="medium"
                                type="primary"
                                text="Sign up"
                                isAsync={false}
                                fullWidth={true}
                                onPress={() => {

                                    setIsSignupActive(true);

                                }}
                            />
                            <div className="text-sm font-light text-gray-500">
                                Already have an account?
                                <span onClick={() => navigate("/login")} className="ml-1 font-medium text-dark-blue-s hover:underline cursor-pointer">Log in</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp