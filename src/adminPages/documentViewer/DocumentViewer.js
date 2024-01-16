import React, { useEffect, useState, useRef } from "react";
import FormField from "../../components/formField/FormField";
import Header from "../../components/adminHeader/Header";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";

import { getFirebaseDocument } from "./functions/getFirebaseDocument";
import { syncFirebaseDocument } from "./functions/syncFirebaseDocument";
import JsonRenderer from "./components/JSONRenderer";


function DocumentViewer() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const documentPath = params.get("query");
    const [documentData, setDocumentData] = useState({});

    const [formElement, setFormElement] = useState(documentPath ? documentPath : "");

    const jsonEditorRef = useRef(null);

    useEffect(() => {
        if (jsonEditorRef.current) {
            jsonEditorRef.current.jsonEditor.set(documentData);
        }
    }, [documentData]);

    useEffect(() => {
        if (documentPath) {
            getFirebaseDocument({
                formElement: documentPath,
                setDocumentData
            });
        }
    }, []);

    useEffect(() => {
        if (formElement) {

            //set the document path in the url to this
            // window.location.search = `?query=${documentPath}`;
        }
    }
        , [formElement]);


    return (
        <div className="flex flex-col">
            <div className="text-black flex flex-col  bg-no-repeat relative min-h-screen max-w-screen overflow-x-hidden inter">
         

                <div className=" h-full flex ml-16 mr-16 mt-5 mb-5 items-center">
                    <FormField
                        formValue={formElement}
                        setFormValue={setFormElement}
                        containerClassName="flex-grow"
                        placeholder="Enter Document Path"
                    />
                    <Button
                        type={'secondary'}
                        text='Query'
                        className='ml-4'
                        isAsync={true}
                        loadingText={"Querying"}
                        onPress={
                            async () => {
                                getFirebaseDocument({
                                    formElement,
                                    setDocumentData
                                });

                            }
                        }
                    />
                    {/* <Button
                        type={'primary'}
                        text='Sync Document'
                        className='ml-4'
                        isAsync={true}
                        loadingText={"Syncing..."}
                        onPress={
                            async () => {
                                syncFirebaseDocument({
                                    formElement,
                                    documentData,
                                    setDocumentData
                                });
                            }
                        }
                    /> */}
                </div>
                <div className="json-viewer mt-0  rounded-sm h-[300px] ml-16 mr-16 flex-grow overflow-scroll">
                    <JsonRenderer data={documentData} />
                    {/* <Editor
                        ref={jsonEditorRef}
                        value={documentData}
                        onChange={() => {
                            setDocumentData(jsonEditorRef.current.jsonEditor.get());
                         }}
                    /> */}
                </div>

            </div>
        </div>
    )

}

export default DocumentViewer;
