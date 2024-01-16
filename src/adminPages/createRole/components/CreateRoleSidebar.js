import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import SidebarItem from '../../../components/sidebar/SidebarItem';
import SidebarHeader from '../../../components/sidebar/SidebarHeader';
import SidebarButtonItem from '../../../components/sidebar/SidebarButtonItem';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { syncRole } from '../functions/syncRole';
import {useParams, useNavigate} from 'react-router-dom';


function CreateRoleSidebar({
    setCreateMainVisible,
    roleState,
    setRoleState,
    setSelectedRoundIndex,

}) {

    const {roleId} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        console.log(roleState)
    }, [roleState])


    return (
        <Sidebar
            width='300px'

        >

            <SidebarHeader
                title='ROLE SETUP'
                className='mt-5'
            />

            <SidebarItem
                title='Visuals'
                isMenu={false}
                onPress={() => {
                    setCreateMainVisible("visuals")
                }}
            />
           

            <SidebarHeader
                title='ROUNDS'
                className='mt-5'
            />

            {roleState?.rounds.map((round, index) => {
                    return (
                
                        <SidebarItem
                            key={index}
                            title={round.title}
                            isMenu={true}
                            onPress={() => {
                                setCreateMainVisible("round");
                                setSelectedRoundIndex(index);
                            }}
                            menuItems={[
                                {
                                    title: 'Move Up',
                                    onPress: () => {
                                        if (index > 0) {
                                            let roleStateRoundsCopy = [...roleState.rounds]

                                            roleStateRoundsCopy.forEach((round, i) => {
                                                if (i === index) {
                                                    round.roundId = i
                                                }
                                                if (i === index - 1) {
                                                    round.roundId = i + 2
                                                }
                                            })

                                            const updatedRounds = roleStateRoundsCopy.sort((a, b) => a.roundId - b.roundId);
                                            setRoleState({
                                                ...roleState,
                                                rounds: updatedRounds,
                                            });

                                        }
                                    },
                                },
                                {
                                    title: 'Move Down',
                                    onPress: () => {
                                        if (index < roleState.rounds.length - 1) {

                                            let roleStateRoundsCopy = [...roleState.rounds]

                                            roleStateRoundsCopy.forEach((round, i) => {
                                                if (i === index) {
                                                    round.roundId = i + 2
                                                }
                                                if (i === index + 1) {
                                                    round.roundId = i
                                                }
                                            })

                                            const updatedRounds = roleStateRoundsCopy.sort((a, b) => b.roundId - a.roundId);
                                            setRoleState({
                                                ...roleState,
                                                rounds: updatedRounds,
                                            });

                                        }
                                    },
                                },
                                {
                                    title: 'Delete',
                                    onPress: () => {

                                        let roleStateRoundsCopy = [...roleState.rounds]
                                        roleStateRoundsCopy.splice(index, 1)
                                        roleStateRoundsCopy.forEach((round, i) => {
                                            round.roundId = i + 1
                                        })
                                        const updatedRounds = roleStateRoundsCopy.sort((a, b) => a.roundId - b.roundId);

                                        setRoleState({
                                            ...roleState,
                                            rounds: updatedRounds,
                                        });
                                    },
                                },
                            ]}
                        />
                    );
                })
            }


            <SidebarButtonItem
                title='Add round'
                icon={<AiOutlinePlusCircle size={15} strokeWidth={0.05} />}
                onPress={() => {
                    
                    let roleStateRoundsCopy = [...roleState?.rounds || []] || []

                    console.log("roleStateRoundsCopy", roleStateRoundsCopy)

                    roleStateRoundsCopy.push({
                        roundId: roleStateRoundsCopy.length + 1,
                        title:"New Round", 
                        emoji:"👍",
                    })

                    console.log("roleStateRoundsCopy", roleStateRoundsCopy)


                    const modifiedRounds = {
                        ...roleState,
                        rounds: roleStateRoundsCopy,
                    }

                    console.log("modifiedRounds", modifiedRounds)

              
                    setRoleState(modifiedRounds);

                    setSelectedRoundIndex(roleState.rounds.length)
     

                    
                }}
            />



        </Sidebar>
    )
}

export default CreateRoleSidebar