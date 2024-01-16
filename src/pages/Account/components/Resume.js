import React, { useState, useRef } from 'react';
import { uploadResumeToUserDocument } from '../functions/uploadResumeToUserDocument';
import VerticalBox from '../../../components/verticalBox/VerticalBox';
import Button from '../../../components/button/Button';



const Resume = ({ 
    authUser, 
    setIsPPMenuOpen, 
    setIsResumeOpen,
    isCreateInterviewInfo,
    setIsResumeUploadingAccount = () => { }
    


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
        height='180px'
        width='500px'
        title= "We need your resume"
        >

                <div className='resume-pp-body p-3 pt-1'>
                    We need a copy of your resume to get to know you better and tailor the interview experience to you.
                </div>
                <div className='p-3 pb-1'>

                <input className='pp-ur-inp' type='file' name='resume' accept='.pdf'
                        onClick={() => {
                            setInheritIsLoading(true);
                            setIsResumeUploading(true)
                            setIsResumeUploadingAccount(true);
                            console.log('clicked upload resume')
                            window.onfocus = () => {
                                console.log('File dialog closed');
                                // Remove event listener after it's called
                                // window.onfocus = null;
                                setIsResumeUploading(false);
                            }
                        }
                        }
                        onChange={async (e) => {

                            return await new Promise(resolve => {
                                console.log(e.target.files[0]);
  

                                uploadResumeToUserDocument(
                                   {
                                       
                                       file: e.target.files[0],
                                       authUser,
                                       setIsResumeOpen,
                                       setIsPPMenuOpen,
                                       isCreateInterviewInfo,
   
                                       
                                  
                                   }
                               );
                                
                                setIsResumeUploading(true);
                                setIsResumeUploadingAccount(true);
                                setTimeout(()=>{
                                    setIsPPMenuOpen(false);
                                    setIsResumeOpen(false);
                                }, 1500);
                         
                              });
                           
                           

                            // setIsResumeUploading(false);
                        }} />
                <Button 
                // className={ 'resume-pp-button '}
               
                text="Upload resume"
                isAsync={true}
                loadingText={"Uploading resume"}
                className='mb-2 hide-pointer-events'
                fullWidth={true}
                type="primary"
                onPress={checkFileProcessed}
                inheritIsLoading={inheritIsLoading}
                shouldInheritIsLoading={true}
                >

                
                    Submit Resume
                </Button>
                
                </div>

            </VerticalBox>
 
    )
}

export default Resume;
