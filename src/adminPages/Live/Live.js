import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import Header from '../../components/adminHeader/Header';
import MainHeading from '../../components/headings/MainHeading';
import BackHeader from "../../components/backHeader/BackHeader.js"

import { db } from '../../firebase'; 

const Live = () => {
    const { interviewId } = useParams();
    const [localTranscript, setLocalTranscript] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');

    useEffect(()=>{
        const interviewRef = doc(db, 'interviews', interviewId);

        const unsubscribe = onSnapshot(interviewRef, (doc) => {
            if (doc.exists()) {
                const { downloadUrl } = doc.data();
                setDownloadUrl(downloadUrl);
            }
        });


    }, [])

    useEffect(() => {
        
        const docRef = doc(db, 'transcripts', interviewId);



        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                const { local_transcript } = data;
    
                setLocalTranscript(JSON.parse(local_transcript));

                console.log("Local transcript: ", localTranscript.main_thread)

            } else {
                console.log('No such document!');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [interviewId]);

    return (

        <div className='live-page'>
            <BackHeader
                navigateUrl='/interviews'
            />
            <div className='p-10 live-main'>

            {downloadUrl&&<a 
                href={downloadUrl}
                target='_blank'
                className='underline text-[#2D9CDB]'
            >
                See the webm recording of candidate here
            </a>}


            <MainHeading
                title="Live Interview"
                />
            
            <div className="mt-4">
                {localTranscript?.main_thread?.reverse()?.map((item, index) => (
                   <div className='flex mt-5'> 
                    <div className="live-role"> 
                    {item.role}
                    </div>
                    <div className='ml-10'>
                     {item.content} </div>
                     </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default Live;
