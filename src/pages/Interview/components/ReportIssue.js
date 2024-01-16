import React from 'react'
import { useState } from 'react'
import { addReportIssueError } from '../../../firestore'
import { useParams } from 'react-router-dom';
import Button from '../../../components/button/Button';
import TextField from '../../../components/textfield/TextField';

function ReportIssue({setShowModal, showModal}) {

    const [issueDescription, setIssueDescription] = useState('');

    const { interviewId } = useParams();

    const handleSubmitFeedback = () => {
        console.log(issueDescription)
        addReportIssueError(issueDescription, interviewId);
        setShowModal(false)
        setIssueDescription('')
    }

    return (



        <>

   
                <div className="bg-white report-issue-modal">
                    <div className="flex items-start justify-between p-4   rounded-t font-medium">
                        Report an Issue with your Interview
                    </div>
                    
                    <div className='pl-4 pr-4'>
                    <TextField
                        placeholder={"Describe issue..."}
                        setTextContent={setIssueDescription}
                        textContent={issueDescription}
                    />
                    </div>

                    <div className="flex items-center justify-end p-2 rounded-b">
                        <Button
                            size="small"
                            type="secondary"
                            text="Cancel"
                            onPress={() => setShowModal(false)}
                            className='mr-2'
                        >
                            
                        </Button>
                        <Button
                            size="small"
                            type="primary"
                            text="Submit"
                            isAsync={false}
                            onPress={() => {
                                handleSubmitFeedback();
                            }}
                        />
                    </div>
                </div>



        </>


    );
}

export default ReportIssue