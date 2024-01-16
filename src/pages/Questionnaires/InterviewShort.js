import React, { useState } from 'react';
import TextField from "../../components/textfield/TextField";
import Button from '../../components/button/Button';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';

function InterviewShort() {

    const [textContent, setTextContent] = useState('')
    const navigate = useNavigate();
    const { authUser } = useAuth();




    return (
        <div className='min-h-[100vh] w-full bg-[#f5f5f6] justify-center items-center flex p-3'>
            <div className='flex justify-center items-center flex-col'>
                <div className=' font-bold mb-4 w-[500px]'>
                    We would really love your feedback! You didn't finish the interview, so we would love to know why. Each interview lasts
                    about 10 minutes, and we can give you feedback on your answers after!
                </div>
                <TextField

                    width='500px'
                    textContent={textContent}
                    setTextContent={setTextContent}
                    className={"mb-10"}
                    placeholder={
                        `e.g.   "It wasn't working" 
    or  "I got bored..."
    or  "I was just looking around..."
    or  "I didn't like the questions..."`}
                />
                <div className='flex'>
                    <Button
                        title='Submit'
                        type={'primary'}
                        size={'medium'}
                        text={"Send us your feedback"}
                        isAsync={true}
                        loadingText={"Sending..."}

                        className='text-white w-[500px]'
                        onPress={
                            async () => {

                                await addDoc(collection(db, "feedback"), {
                                    text: textContent,
                                    timestamp: Date.now(),
                                    uid: authUser?.uid || null,
                                })

                                navigate('/account')



                            }}
                    />
                </div>
            </div>

        </div>
    );
}

export default InterviewShort;
