import { useState, useEffect, useRef } from 'react';
import Header from '../../components/adminHeader/Header';
import MainHeading from '../../components/headings/MainHeading';
import { db } from '../../firebase';
import Table from '../../components/table/Table';
import FocusView from '../../components/focusView/FocusView';
import { processInterviews } from './functions/processInterviews';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/formField/FormField';
import FormDropdown from '../../components/formField/FormDropdown';
import { fetchByTitle } from './functions/fetchByTitle';
import { fetchByEmail } from './functions/fetchByEmail';
import { fetchByTemplateId } from './functions/fetchByTemplateId';
import { fetchByUid } from './functions/fetchByUid';
import { useAuth } from '../../auth';
import { doc, getDoc } from "firebase/firestore";


const Interviews = () => {
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const [selectedInterviews, setSelectedInterviews] = useState([]);
    const [interviewIds, setInterviewIds] = useState([]);
    const [searchContent, setSearchContent] = useState('');
    const [searchQueryValue, setSearchQueryValue] = useState("Title");
    const [suAccess, setSuAccess] = useState([])
    const { authUser, isLoading, signOut } = useAuth();
    const lastVisibleRef = useRef(null);
    const firstVisibleRef = useRef(null);
    const directionRef = useRef('next');
    const interviewsRef = useRef([]);
    const interviewIdsRef = useRef([]);

    useEffect(() => {

        const getSuAccess = async () => {
            const suAccessDocRef = doc(db, 'admin', 'suAccess');
            const docSnap = await getDoc(suAccessDocRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setSuAccess(data.uids);
            } else {
                console.log("No such document!");
            }
        }

        getSuAccess();

    }, []);
    useEffect(() => {
        if (suAccess.length && authUser) {


            if (suAccess.includes(authUser.uid)) {
                processInterviews({
                    setInterviews,
                    setInterviewIds,
                    lastVisibleRef,
                    firstVisibleRef,
                    directionRef,
                    interviews,
                    interviewsRef, 
                    interviewIds, 
                    interviewIdsRef
                })

            } else {

                navigate('/dashboard')
            }
        }

    }, [authUser, suAccess]);

    return (
        <div className='live-page'>
            <Header
                selected={'interviews'}
            />
            <div className='live-main'>





                <>
                    <div className='reviews-header ml-16 mt-16 mb-4'>
                        Interviews
                    </div>
                    <div className='ml-16  mr-16 flex items-center'>
                        <div className='w-[100px] mr-4'>
                            <FormDropdown
                                formValue={searchQueryValue}
                                setFormValue={setSearchQueryValue}
                                options={[
                                    {
                                        value: "Title",
                                        display: "title"
                                    },
                                    {
                                        value: "Email",
                                        display: "email"
                                    },
                                    {
                                        value: "UID",
                                        display: "uid"
                                    },
                                    {
                                        value: "Template ID",
                                        display: "template id"
                                    },
                                ]}
                            />
                        </div>
                        <FormField
                            placeholder='Enter title, email, uid, template id...'
                            width='600px'
                            // containerClassName='mt-1'
                            formValue={searchContent}
                            setFormValue={setSearchContent}
                        />
                        <Button
                            type={'secondary'}
                            text='Query'
                            className='ml-4'
                            isAsync={true}
                            loadingText={"Querying"}
                            onPress={
                                async () => {
                                    console.log("searchContent", searchContent)

                                    switch (searchQueryValue) {
                                        case "Title":
                                            // make query for title
                                            await fetchByTitle({
                                                title: searchContent.trim(),
                                                setInterviews
                                            })
                                            break;
                                        case "Email":

                                            await fetchByEmail({
                                                email: searchContent.trim(),
                                                setInterviews,
                                                setInterviewIds
                                            })

                                            break;
                                        case "UID":

                                            fetchByUid({
                                                uid: searchContent.trim(),
                                                setInterviews
                                            })

                                            break;
                                        case "Template ID":
                                            // make query for template ID

                                            fetchByTemplateId({
                                                templateId: searchContent.trim(),
                                                setInterviews
                                            })
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        />
                        <Button
                            type={'secondary'}
                            text='Clear Filter'
                            className='ml-4'
                            isAsync={true}
                            loadingText={"Resetting..."}
                            onPress={
                                async () => {

                                    processInterviews({
                                        setInterviews,
                                        setInterviewIds,
                                        interviewIds
                                    })


                                }
                            }
                        />
                    </div>
                    <div className='ml-16 flex mt-4 mb-2 justify-between mr-16'>
                        <div className='flex'>
                            <div className='tag sub-tag mr-2'> Title</div>
                            <div className='tag sub-tag mr-2'> Timestamp</div>
                            <div className='tag sub-tag mr-2'> User</div>
                            <div className='tag sub-tag mr-2'> Duration</div>
                            <div className='tag sub-tag'> Analysed</div>

                        </div>


                        {

                            (selectedInterviews?.length > 0)
                            &&
                            <div>

                                <Button
                                    text='Open Document Editor'
                                    size="small"
                                    type="secondary"
                                    className='mr-4'
                                    onPress={() => {
                
                                        navigate("/document?query=/interviews/" + interviewIds[selectedInterviews[0]])


                                    }}
                                />

                                <Button
                                    text='Copy Id'
                                    size="small"
                                    type="secondary"
                                    className='mr-4'
                                    onPress={() => {
                                        //copy the id to clipboard

                                        navigator.clipboard.writeText(interviewIds[selectedInterviews[0]])


                                    }}
                                />
                                <Button
                                    text='Open Review'
                                    size="small"
                                    type="secondary"
                                    className='mr-4'
                                    onPress={() => {
                                        if (selectedInterviews?.length) {
                                            navigate(`/review/${interviewIds[selectedInterviews[0]]}`)
                                        }
                                    }}
                                />
                                <Button
                                    text='Open Live Viewer'
                                    size="small"
                                    type="primary"
                                    isAsync={true}
                                    loadingText={"Opening"}
                                    onPress={() => {
                                        //create a promise that resolves in 0.5 seconds
                                        return new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                resolve("hi");
                                                if (selectedInterviews?.length) {
                                                    navigate(`/live/${interviewIds[selectedInterviews[0]]}`)
                                                }
                                            }, 500);
                                        });
                                    }}
                                />
                            </div>
                        }

                    </div>
                    {(interviews.length > 0) &&
                        <div className='ml-16 '>
                            <Table
                                headings={['Title', 'Timestamp', 'User', 'Duration', "Analysed"]}
                                rows={interviews}
                                tableContainerClassName='mr-16'
                                setSelectedElements={setSelectedInterviews}
                                selectedElements={selectedInterviews}
                                widths={["200px", "200px", "350px", "200px", "200px"]}
                                rowsHeight={"calc(100vh - 360px)"}
                                onRowBottomReached={() => {
                                    processInterviews({
                                        setInterviews,
                                        setInterviewIds,
                                        lastVisibleRef,
                                        firstVisibleRef,
                                        directionRef,
                                        interviews,
                                        interviewsRef, 
                                        interviewIds,
                                        interviewIdsRef

                                    })
                                }}
                            />
                        </div>
                    }
                </>

            </div>
        </div>
    );
};

export default Interviews;
