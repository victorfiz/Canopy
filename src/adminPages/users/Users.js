import React from 'react';
import Header from '../../components/adminHeader/Header';
import FormField from '../../components/formField/FormField';
import Button from '../../components/button/Button';
import Table from '../../components/table/Table';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormDropdown from '../../components/formField/FormDropdown';
import { httpsCallable } from 'firebase/functions';
import { functions } from "../../firebase";

import { db } from '../../firebase';

import { deleteDoc, doc } from 'firebase/firestore';

import { processInterviews } from './functions/processUsers';


function Users() {
    const [searchQueryValue, setSearchQueryValue] = useState("Title");
    const [searchContent, setSearchContent] = useState("");

    //call the delete_auth_user cloud function deleteAuthUser

    const deleteAuthUser = httpsCallable(functions, 'delete_auth_user');


    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedInterviews] = useState([]);
    const [uids, setUids] = useState({});

    useEffect(() => {

        processInterviews({
            setUsers,
            setUids
        })

    }, []);


    return (
        <div>

            <Header
                selected={"users"}
            />

            <div className='live-main'>





                <>
                    <div className='reviews-header ml-16 mt-16 mb-4'>
                        Users
                    </div>
                    {/* <div className='ml-16  mr-16 flex items-center'>
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


                }
            }
        />
    </div> */}
                    <div className='ml-16 flex mt-4 mb-2 justify-between mr-16'>
                        <div className='flex'>
                            <div className='tag sub-tag mr-2'> Email</div>
                            <div className='tag sub-tag mr-2'> Is Subscribed</div>
                            <div className='tag sub-tag mr-2'> Interviews Count</div>
                            <div className='tag sub-tag mr-2'> Reviews Count</div>
                            <div className='tag sub-tag mr-2'> Signup Timestamp</div>

                        </div>

                        {

                            (selectedUsers?.length > 0)
                            &&
                            <div>

                                <Button
                                    text='Open Document Editor'
                                    size="small"
                                    type="secondary"
                                    className='mr-4'
                                    onPress={() => {

                                        navigate("/document?query=/users/" + uids[selectedUsers[0]])


                                    }}
                                />


                                <Button
                                    text='Copy uid'
                                    size="small"
                                    type="secondary"
                                    className='mr-4'
                                    onPress={() => {
                                        //copy the id to clipboard

                                        navigator.clipboard.writeText(uids[selectedUsers[0]])


                                    }}
                                />
                                <Button
                                    text={selectedUsers.length > 1 ? "Delete users" : "Delete user"}
                                    size="small"
                                    type="destructive"
                                    className='mr-4'
                                    isAsync={true}
                                    loadingText={"Deleting users"}
                                    onPress={
                                        async () => {





                                            if (selectedUsers?.length) {
                                                for (let selectedUser of selectedUsers) {


                                                    let selectedUid = uids[selectedUser]


                                                    //     try{
                                                    //      deleteAuthUser({
                                                    //         uid: selectedUid
                                                    //     })
                                                    // } catch(e){
                                                    //     console.log("Error deleting user: ", e)
                                                    // }

                                                    await deleteDoc(doc(db, "users", selectedUid));





                                                }
                                            }
                                        }}
                                />
                                <Button
                                    text='Edit User'
                                    size="small"
                                    type="primary"
                                    isAsync={true}
                                    loadingText={"Opening"}
                                    onPress={() => {
                                        //create a promise that resolves in 0.5 seconds
                                        return new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                resolve("hi");
                                                if (selectedUsers?.length) {
                                                    navigate(`/user/${uids[selectedUsers[0]]}`)
                                                }
                                            }, 500);
                                        });
                                    }}
                                />
                            </div>
                        }

                    </div>
                    {(users.length > 0) &&
                        <div className='ml-16 '>
                            <Table
                                headings={
                                    ["Email", "Subscribed", "# Interviews", "# Reviews", "Timestamp"]
                                }
                                rows={users}
                                rowsHeight="calc(100vh - 310px)"
                                tableContainerClassName='mr-16'
                                setSelectedElements={setSelectedInterviews}
                                selectedElements={selectedUsers}
                                widths={["350px", "150px", "150px", "150px", "250px"]}
                            />
                        </div>
                    }
                </>

            </div>

        </div>
    );
}

export default Users;
