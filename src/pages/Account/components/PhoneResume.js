import React, { useState, useRef } from 'react';
import { uploadResumeToUserDocument } from '../functions/uploadResumeToUserDocument';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import Button from '../../../components/button/Button';


const PhoneResume = ({
    authUser,
    setIsPPMenuOpen,
    setIsResumeOpen,
    isCreateInterviewInfo
}) => {
    const [isResumeUploading, setIsResumeUploading] = useState(false);
    const isFileProcessed = useRef(false);
    const [inheritIsLoading, setInheritIsLoading] = useState(false);
    const checkFileProcessed = async () => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (isFileProcessed.current) {
                    clearInterval(interval);
                    resolve(true);
                }
            }, 500);
        });
    };
    return (

        <VerticalBox
            height='90vh'
            width='90vw'
            title="We need your resume"
        >

            <div className='resume-pp-body p-3 pt-1'>
                We need a copy of your resume to get to know you better and tailor the interview experience to you.
            </div>
            <div className='p-3 pb-1'>

                <input className='pp-ur-inp' type='file' name='resume' accept='.pdf'
                    onClick={() => {
                        setInheritIsLoading(true);
                        setIsResumeUploading(true)
                        window.onfocus = () => {
                            window.onfocus = null;
                            setIsResumeUploading(false);
                        }
                    }
                    }
                    onChange={async (e) => {
                        setIsResumeUploading(true);
                        console.log(e.target.files[0]);

                        console.log("isCreateInterviewInfo", isCreateInterviewInfo)

                        await uploadResumeToUserDocument(
                            {
                                
                                file: e.target.files[0],
                                authUser,
                                setIsResumeOpen,
                                setIsPPMenuOpen,
                                

                                
                           
                            }
                        );
                        setInheritIsLoading(false);

      
                    }} />
                <Button

                    text="Upload resume"
                    isAsync={true}
                    loadingText={"Uploading resume"}
                    className='mb-2'
                    fullWidth={true}
                    type="primary"
                    onPress={checkFileProcessed}
                    inheritIsLoading={inheritIsLoading}
                    shouldInheritIsLoading={true}
                >


                    Submit Resume
                </Button>
                <Button
                    // className={ 'resume-pp-button '}

                    text="Close"
                    className='mb-2'
                    fullWidth={true}
                    type="secondary"
                    onPress={() => setIsResumeOpen(false)}
                >


                    Submit Resume
                </Button>

            </div>

        </VerticalBox>

    )
}

export default PhoneResume;
