import React, { useEffect, useState } from 'react';
import TextField from '../../components/textfield/TextField';
import Button from '../../components/button/Button';
import MainHeading from '../../components/headings/MainHeading';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { getDoc, updateDoc, setDoc, doc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function Polls() {

    const navigate = useNavigate();
    const { uid, pollId, option } = useParams();

    const [feedbackFormContent, setFeedbackFormContent] = useState(null);

    useEffect(() => {

        if(!pollId || !uid || !option) return;

        const updatePollResults = async () => {
            const pollRef = doc(db, 'polls', pollId, 'results', uid);
            await setDoc(pollRef, { option }, { merge: true });
        }

        updatePollResults();
        
    }, [pollId, uid, option])


    return (
        <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
            <div>
                <MainHeading
                    title={'Care to share more...'}
                    className={'mb-10'}
                />
                <TextField
                    width={450}
                    textContent={feedbackFormContent}
                    setTextContent={setFeedbackFormContent}
                />
                <Button
                    type={'primary'}
                    fullWidth={true}
                    isAsync={true}
                    loadingText={'Sending...'}
                    className={'mt-10'}
                    onPress={
                        async() => {
                        console.log("feedbackFormContent", feedbackFormContent);
                        updateDoc(doc(db, 'polls', pollId, 'results', uid), {
                            textFeedback: feedbackFormContent
                        })

                        navigate(`/account`)
                        
                    }}
                    text={'Submit Response'}


                />
            </div>
        </div>
    );
}

export default Polls;
