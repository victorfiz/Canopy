import React from 'react';
import { useNavigate } from 'react-router-dom';

function Roles({
    userState
}) {
    const navigate = useNavigate();
    return (
        <div className=' mt-10 flex  flex-col items-center relative sm:flex-row flex-wrap max-w-[1200px]'>
            {userState?.roles?.filter((role, index, self) => self.findIndex(r => r.roleId === role.roleId) === index).map((role, index) => {
                return (
                    <div className='relative'>
                        {role.roleIsLocked&&<div className='absolute locked-icon z-10 ml-[130px] mt-[-10px]'>
                            {/* 🔒 */}
                        </div>}
                        {/* {(!userState.isSubscribed && role.roleId==="W3aFdqRSPxwDyIFwr84N")&&<div className='header-available-interviews absolute locked-icon z-10 ml-[130px] mt-[-10px] text-[15px]'>
                                    <div className='bg-[#0fb] text-white rounded-full h-[20px] w-[20px] flex text-center justify-center items-center'> 3</div>
  
                                </div>} */}
                        <div
                            key={index}
                            className={`flex items-center mb-6 overflow-hidden rounded pointer clickscale  expand-on-hover sm:mr-12  ${(!userState.isSubscribed&&!role.roleIsLocked)?"shadow-lg":""}}`}
                            onClick={() => {
                                navigate(`/role/${role.roleId}`)
                            }}
                        >

                            <img
                                src={role.roleIcon}
                                className={`h-[140px] w-[140px] rounded ${role.roleIsLocked?"":""}`}
                            />

                        </div>

                    </div>
                )
            })
            }
        </div>
    );
}

export default Roles;
