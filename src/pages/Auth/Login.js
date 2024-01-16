import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth';
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import LoadingIcon from './components/LoadingIcon';
import Button from '../../components/button/Button.js';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSignupActive, setIsSignupActive] = useState(false);


    const { authUser, isLoading, signIn,signInWithGoogle } = useAuth();

    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && authUser) {
            navigate("/account");
        }
    }, [authUser, isLoading])

    const handleSubmit = async e => {
        e.preventDefault();

        const errorMessage = await signIn(email, password);

        if (errorMessage) {
            setErrorMessage(errorMessage);
        }
    }

    const handleSignUpWithGoogle = async (e) => {
        e.preventDefault();
        await signInWithGoogle();
        setIsSignupActive(true);
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
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in to your account
                        </h1>
                         
                        <button onClick={handleSignUpWithGoogle} className="w-full bg-gray-300 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="h-5 w-5 mr-2" />
                            Sign up with Google
                        </button>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input onChange={e => setEmail(e.target.value)} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@example.com" required=""></input>
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
                            <div className="text-center">
                                <span className="text-sm text-red-500">{errorMessage}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">

                                </div>
                                <div onClick={() => navigate("/resetpassword")} className="text-sm font-medium text-dark-blue-s hover:underline cursor-pointer">Forgot password?</div>
                            </div>
                            <Button
                                size="medium"
                                type="primary"
                                text="Log in"
                                isAsync={false}
                                fullWidth={true}
                                onPress={() => {

                                }}
                            />
                            <div className="text-sm font-light text-gray-500">
                                Don’t have an account yet?
                                <span onClick={() => navigate("/signup")} className="ml-1 font-medium text-dark-blue-s hover:underline cursor-pointer">Sign up</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login