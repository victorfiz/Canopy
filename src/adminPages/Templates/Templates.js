import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/adminHeader/Header';
import { useAuth } from '../../auth';
import Table from '../../components/table/Table';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { getTemplatesByTimestamp } from './functions/templatesListener'
import FormField from '../../components/formField/FormField';
import { getTemplatesByTag } from './functions/getTemplatesByTag';
import { getTemplatesByTitle } from './functions/getTemplatesByTitle';
import { getTemplatesById } from './functions/getTemplatesById';
import { deleteTemplate } from './functions/deleteTemplate';
import { createTemplate } from './functions/createTemplate';
import { multiSplice } from './functions/multiSplice';
import { duplicateTemplate } from './functions/duplicateTemplate';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';

function Templates() {
    let navigate = useNavigate();
    const { authUser, isLoading, signOut } = useAuth();
    const [templates, setTemplates] = useState([]);
    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [templateIds, setTemplateIds] = useState(null);
    const startAfterTimestamp = useRef(null);
    const [searchContent, setSearchContent] = useState('');
    const [suAccess, setSuAccess] = useState([])



    useEffect(() => {

        if(suAccess.length && authUser){


        if (suAccess.includes(authUser.uid)) {
        getTemplatesByTimestamp({
            startAfterTimestamp,
            setTemplates,
            setTemplateIds,
            templatesState: templates
        })
    } else {
    
        navigate('/dashboard')
    }
}
    }, [authUser, suAccess]);

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
    return (

        <div className='templates-page'>
            <Header
                selected='templates'
            />

            <div className='flex flex-col templates-page-container'>

                < div className='flex-grow flex flex-col if-template-holder'>
                    <div className='reviews-header ml-16 mt-4'>
                        Interview Templates
                    </div>

                    <div className='ml-16 mt-4 mr-16 flex items-center'>
                        <FormField
                            placeholder='property: value (properties are tags, title, id)'
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

                                    if (!searchContent.includes(':')) {
                                        return;
                                    }

                                    const queryType = searchContent.split(':')[0].trim()

                                    const queryValue = searchContent.split(':')[1].trim()

                                    if (queryType === 'title') {

                                        await getTemplatesByTitle({
                                            queryValue,
                                            setTemplates,
                                        })
                                    }
                                    else if (queryType === 'id') {

                                        await getTemplatesById({
                                            queryValue,
                                            setTemplates,
                                        })

                                    }
                                    else if (queryType === 'tags') {
                                        await getTemplatesByTag({
                                            queryValue,
                                            setTemplates,
                                        })
                                        console.log("searching by tags")
                                    }
                                    else {
                                        console.log("invalid query")
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
                                    getTemplatesByTimestamp({
                                        startAfterTimestamp,
                                        setTemplates,
                                        setTemplateIds,
                                        templatesState: templates
                                    })

                                }
                            }
                        />
                    </div>

                    <div className='ml-16 flex mt-8 mb-4 justify-between mr-16'>
                        <div className='flex'>
                            <div className='tag sub-tag mr-2'> Title</div>
                            <div className='tag sub-tag mr-2'> Timestamp</div>
                            <div className='tag sub-tag mr-2'> Tags</div>
                            <div className='tag sub-tag'> Number of Questions</div>
                        </div>

                        <div className='items-center flex'>
                            {
                                (selectedTemplates.length > 0)
                                && <>

                                    <Button
                                        text='Copy Template Id'
                                        size="small"
                                        type="secondary"
                                        isAsync={true}
                                        loadingText={"Duplicating"}
                                        className='mr-4'
                                        onPress={
                                            async () => {
                                                //create a promise that resolves in 0.5 seconds
                                                if (selectedTemplates[0] !== null) {
                                                    navigator.clipboard.writeText(templateIds[selectedTemplates[0]])
                                                }
                                            }}
                                    />

                                    <Button
                                        text='Duplicate Template'
                                        size="small"
                                        type="secondary"
                                        isAsync={true}
                                        loadingText={"Duplicating"}
                                        onPress={
                                            async () => {
                                                //create a promise that resolves in 0.5 seconds
                                                if (selectedTemplates[0] !== null) {
                                                    duplicateTemplate({
                                                        templateId: templateIds[selectedTemplates[0]],
                                                    })



                                                }
                                            }}
                                    />
                                    <Button
                                        text='Open Template'
                                        size="small"
                                        type="secondary"
                                        isAsync={true}
                                        loadingText={"Opening"}
                                        className='ml-4'

                                        onPress={() => {
                                            //create a promise that resolves in 0.5 seconds
                                            return new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    if (selectedTemplates[0] !== null) {
                                                        console.log()

                                                        navigate(`/create/${templateIds[selectedTemplates[0]]}`)



                                                    }

                                                }, 500);
                                            });
                                        }}
                                    />
                                    <Button
                                        text='Delete Templates'
                                        size="small"
                                        type="destructive"
                                        className='ml-4'
                                        isAsync={true}
                                        loadingText={"Deleting"}
                                        onPress={
                                            async () => {
                                                console.log("deleting template")


                                                // return;
                                                console.log("templateIds", templateIds)
                                                for (let templateIndex = 0; templateIndex < selectedTemplates.length; templateIndex++) {
                                                    await deleteTemplate({
                                                        templateId: templateIds[selectedTemplates[templateIndex]],
                                                        setTemplates,
                                                        setTemplateIds,
                                                        templateIds,
                                                        templates
                                                    })
                                                }

                                                const splicedTemplates = multiSplice({
                                                    mainArray: [...templates],
                                                    spliceIndices: [...selectedTemplates]
                                                }).mainArray

                                                console.log("mainArray", splicedTemplates)

                                                const splicedTemplateIds = multiSplice({
                                                    mainArray: [...templateIds],
                                                    spliceIndices: [...selectedTemplates]
                                                }).mainArray

                                                setTemplates(splicedTemplates)
                                                setTemplateIds(splicedTemplateIds)

                                                setSelectedTemplates([])




                                            }}
                                    />
                                </>}

                            <Button
                                text='Create Template'
                                size="small"
                                type="primary"
                                isAsync={true}
                                loadingText={"Creating"}
                                className='ml-4'

                                onPress={
                                    async () => {
                                        console.log("creating new interview")
                                        const { id } = await createTemplate()
                                        navigate(`/create/${id}`)
                                    }}
                            />
                        </div>

                    </div>

                    <div className='ml-16 template-page-table-container flex flex-col flex-grow'>
                        <Table
                            headings={['Title', 'Timestamp', 'Tags', 'Number of Questions', 'Interviews Started']}
                            rows={templates}
                            isReviews={true}
                            tableContainerClassName='mr-16'
                            setSelectedElements={setSelectedTemplates}
                            selectedElements={selectedTemplates}
                            rowsHeight='calc(100vh - 355px)'
                            widths={[
                                300, 150, 300, 250, 150
                            ]}

                        />
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Templates;