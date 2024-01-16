import React, { useEffect, useState } from 'react';
import CreateRoleSidebar from './components/CreateRoleSidebar';
import BackHeader from '../../components/backHeader/BackHeader';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import VisualsSetup from './components/VisualsSetup';
import RoundBuilder from './components/RoundBuilder';
import { syncRole } from './functions/syncRole';
import { useParams } from 'react-router-dom';
import { roleListener } from './functions/roleListener';

function CreateRole() {

    const [createMainVisible, setCreateMainVisible] = useState("visuals");
    const [roleState, setRoleState] = useState({
        rounds:[]
    });
    const [selectedRoundIndex, setSelectedRoundIndex] = useState(0);

    const { roleId } = useParams()

    useEffect(() => {

        roleListener({
            setRoleState,
            roleId, 
            roleState
        })

    }, [])



    return (
        <div className='create-page h-[100vh] flex flex-col'>
            <BackHeader
                navigateUrl='/all-roles'
            />
            <div className='create-page-content flex'>
                <CreateRoleSidebar
                    setCreateMainVisible={setCreateMainVisible}
                    roleState={roleState}
                    setRoleState={setRoleState}
                    setSelectedRoundIndex={setSelectedRoundIndex}
                />
                <div className='create-main-page-content w-full pr-10'>


                    {(createMainVisible === "visuals")
                        &&
                        <VisualsSetup
                            roleState={roleState}
                            setRoleState={setRoleState}
                        />}

                    {(createMainVisible === "round")
                        &&
                        <RoundBuilder

                            roleState={roleState}
                            setRoleState={setRoleState}
                            selectedRoundIndex={selectedRoundIndex}


                        />}




                </div>
            </div>
            <Footer>


                <Button
                    className='ml-4'
                    type='primary'
                    text='Sync role'
                    isAsync={true}
                    onPress={async () => {
                        await syncRole({
                            roleState,
                            roleId
                        })
                    }}

                    loadingText={"Syncing template"}
                />
            </Footer>
        </div>
    );
}

export default CreateRole;
