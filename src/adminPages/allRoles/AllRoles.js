import React, { useEffect, useState } from 'react';
import Header from '../../components/adminHeader/Header';
import Button from '../../components/button/Button';
import Table from '../../components/table/Table';

import { createRole } from './functions/createRole';
import { rolesListener } from './functions/rolesListener';
import { deleteRole } from './functions/deleteRole';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';



const AllRoles = () => {
    const [selectedRoles, setSelectedRoles] = useState([])
    const [roles, setRoles] = useState([])
    const [roleIds, setRoleIds] = useState([])
    const [suAccess, setSuAccess] = useState([])
    const { authUser, isLoading, signOut } = useAuth();



    useEffect(() => {
        if (suAccess.length && authUser) {


            if (suAccess.includes(authUser.uid)) {
                rolesListener({
                    setRoles,
                    setRoleIds
                })
            } else {

                navigate('/dashboard')
            }
        }
    }, [authUser, suAccess])

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

    const navigate = useNavigate()

    return (
        <div className='templates-page'>
            <Header
                selected='roles'
            />

            <div className='flex flex-col templates-page-container'>

                < div className='flex-grow flex flex-col if-template-holder mt-8'>
                    <div className='reviews-header ml-16'>
                        Manage Roles
                    </div>
                    <div className='ml-16 flex mt-8 mb-4 justify-between mr-16'>

                        <div className='flex'>
                            <div className='tag sub-tag mr-2'> Name</div>
                            <div className='tag sub-tag mr-2'> Role Id</div>
                            <div className='tag sub-tag mr-2'> Icon Url</div>
                            <div className='tag sub-tag'> Number of Rounds</div>
                        </div>

                        <div className='items-center flex'>
                            {
                                (selectedRoles.length > 0)
                                && <>



                                    <Button
                                        text='Open Role Editor'
                                        size="small"
                                        type="secondary"
                                        isAsync={true}
                                        loadingText={"Opening"}
                                        className='ml-4'

                                        onPress={() => {
                                            navigate(`/create-role/${roleIds[selectedRoles[0]]}`)

                                        }}
                                    />
                                    <Button
                                        text='Delete Role'
                                        size="small"
                                        type="destructive"
                                        className='ml-4'
                                        isAsync={true}
                                        loadingText={"Deleting"}
                                        onPress={
                                            async () => {

                                                await deleteRole(roleIds[selectedRoles[0]])


                                            }}
                                    />
                                </>}

                            <Button
                                text='Create Role'
                                size="small"
                                type="primary"
                                isAsync={true}
                                loadingText={"Creating"}
                                className='ml-4'

                                onPress={
                                    async () => {
                                        await createRole()

                                    }}
                            />
                        </div>




                    </div>
                    <div className='ml-16 template-page-table-container flex flex-col flex-grow'>
                        <Table
                            headings={['Name', 'Role Id', 'Icon', 'Number of Rounds',]}
                            rows={roles}
                            isReviews={true}
                            tableContainerClassName='mr-16'
                            setSelectedElements={setSelectedRoles}
                            selectedElements={selectedRoles}
                            rowsHeight='calc(100vh - 300px)'
                            widths={[
                                300, 250, 300, 150
                            ]}

                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRoles;
