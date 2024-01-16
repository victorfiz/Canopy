import React, { useEffect, useState, useRef } from 'react';
import BackHeader from '../../components/backHeader/BackHeader';
import { useParams } from 'react-router-dom';
import { addUserListener } from './functions/addUserListener';

import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import HorizontalMenu from '../../components/horizontalMenu/HorizontalMenu';
import UserMain from './components/UserMain';

import ResumeMain from './components/ResumeMain';
import InteractionsMain from './components/InteractionsMain';
import Navigate from './components/Navigate';
import { syncUser } from './functions/syncUser';

function User() {

    const uid = useParams().uid;

    const [userState, setUserState] = useState(null)
    const [visibleSection, setVisibleSection] = useState("user")

    useEffect(() => {
        addUserListener({
            setUserState,
            uid,
        })
        console.log("userState", userState);
    }, [])


    return (
        <div className='flex flex-col h-[100vh]'>
            <BackHeader
                navigateUrl='/users'
            />

            <HorizontalMenu

                items={[
                    {
                        display: "User",
                        onPress: () => {
                            setVisibleSection("user")
                            console.log("onPress")
                        }
                    },
                    {
                        display: "Resume",
                        onPress: () => {
                            setVisibleSection("resume")
                            console.log("onPress")
                        }
                    },
                    {
                        display: "Interactions",
                        onPress: () => {
                            setVisibleSection("interactions")
                            console.log("onPress")
                        }
                    }, 
                    {
                        display: "Navigate",
                        onPress: () => {
                            setVisibleSection("navigate")
                            console.log("onPress")
                        }
                    }

                ]}
                className="mt-10 ml-10 w-[600px]"
            // border={false}
            />


            {visibleSection === "user" &&
                <UserMain
                    userState={userState}
                    setUserState={setUserState}
                />
            }

            {visibleSection === "resume" &&
                <ResumeMain
                    userState={userState}
                    setUserState={setUserState}
                />
            }

            {visibleSection === "interactions" &&
                <InteractionsMain
                    userState={userState}
                    setUserState={setUserState}
                />
            }

            {visibleSection === "navigate" &&
                <Navigate
                    uid={uid}
                />
            }



            <Footer>
                <Button
                    text='Sync User'
                    type='primary'
                    onPress={() => {
                        console.log("userState", userState);
                        syncUser({
                            userState,
                            uid
                        })
                    }}
                />
            </Footer>
        </div>
    );
}

export default User;
